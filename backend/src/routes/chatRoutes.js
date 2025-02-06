const express = require('express');
const router = express.Router();// Assuming you have authentication middleware
const chatController = require('./../controllers/chatController');
const {authenticateUser}=require("./../middlewares/authenticate")
// Get all chat rooms for the authenticated user
router.get('/', authenticateUser, chatController.getUserChats);

// Create or get existing chat room
router.post('/', authenticateUser, chatController.createOrGetChatRoom);

// Get messages for a specific chat room
router.get('/:chatRoomId/messages', authenticateUser, chatController.getChatMessages);

// Send a message
router.post('/messages', authenticateUser, chatController.sendMessage);

module.exports = router; 