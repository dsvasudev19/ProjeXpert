const { ChatRoom, Message, User } = require('./../models');
const { Op } = require('sequelize');

const getUserChats = async (req, res) => {
    try {
        const userId = req.user.id; 

        const chatRooms = await ChatRoom.findAll({
            where: {
                [Op.or]: [
                    { participant1Id: userId },
                    { participant2Id: userId }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'participant1',
                    attributes: ['id', 'name', 'avatar']
                },
                {
                    model: User,
                    as: 'participant2',
                    attributes: ['id', 'name', 'avatar']
                },
                {
                    model: Message,
                    as: 'messages',
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                }
            ],
            order: [['lastMessageAt', 'DESC']]
        });

        res.json(chatRooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new chat room or get existing one
const createOrGetChatRoom = async (req, res) => {
    try {
        const { participantId,chatName } = req.body;
        const userId = req.user.id;

        // Check if chat room already exists
        const existingRoom = await ChatRoom.findOne({
            where: {
                [Op.or]: [
                    {
                        participant1Id: userId,
                        participant2Id: participantId
                    },
                    {
                        participant1Id: participantId,
                        participant2Id: userId
                    }
                ]
            }
        });

        if (existingRoom) {
            return res.json(existingRoom);
        }

        // Create new chat room
        const newRoom = await ChatRoom.create({
            name:chatName,
            participant1Id: userId,
            participant2Id: participantId
        });

        res.status(200).json(newRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Send a message
const sendMessage = async (req, res) => {
    try {
        const { chatRoomId, content ,attachment} = req.body;
        const senderId = req.user.id;

        const message = await Message.create({
            chatRoomId,
            senderId,
            content,
            attachment:attachment?attachment:null
        });

        // Update last message timestamp
        await ChatRoom.update(
            { lastMessageAt: new Date() },
            { where: { id: chatRoomId } }
        );
        
        
        return res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get messages for a chat room
// const getChatMessages = async (req, res) => {
//     try {
//         const { chatRoomId } = req.params;
//         const userId = req.user.id;

//         // Verify user is part of this chat room
//         const chatRoom = await ChatRoom.findOne({
//             where: {
//                 id: chatRoomId,
//                 [Op.or]: [
//                     { participant1Id: userId },
//                     { participant2Id: userId }
//                 ]
//             }
//         });

//         if (!chatRoom) {
//             return res.status(403).json({ error: 'Access denied' });
//         }

//         const messages = await Message.findAll({
//             where: { chatRoomId },
//             include: [
//                 {
//                     model: User,
//                     as: 'sender',
//                     attributes: ['id', 'name', 'avatar']
//                 }
//             ],
//             order: [['createdAt', 'ASC']]
//         });

//         res.json(messages);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const getChatMessages = async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        const userId = req.user.id;
        const limit = parseInt(req.query.limit) || 15; // Default to 15 messages
        const offset = parseInt(req.query.offset) || 0; // Default to 0 offset

        // Verify user is part of this chat room
        const chatRoom = await ChatRoom.findOne({
            where: {
                id: chatRoomId,
                [Op.or]: [
                    { participant1Id: userId },
                    { participant2Id: userId }
                ]
            }
        });

        if (!chatRoom) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const messages = await Message.findAll({
            where: { chatRoomId },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'name', 'avatar']
                }
            ],
            order: [['createdAt', 'DESC']], // Latest first
            limit: limit,
            offset: offset
        });

        // Reverse messages to display in ascending order (oldest first) on the frontend
        const totalMessages = await Message.count({ where: { chatRoomId } });
        res.json({
            messages: messages.reverse(), // Oldest first for UI
            totalMessages,
            hasMore: offset + messages.length < totalMessages // Indicate if more messages exist
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getUserChats,
    createOrGetChatRoom,
    sendMessage,
    getChatMessages
}; 