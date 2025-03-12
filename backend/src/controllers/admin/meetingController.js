// controllers/meetingController.js
const { Meeting, MeetingParticipant, User, sequelize } = require('../../models');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

// Helper function to generate a unique room name
const generateRoomName = () => {
  return `pm-meeting-${uuidv4().split('-')[0]}`;
};

// Helper function to generate a JWT token for Jitsi
const generateJitsiToken = (userId, displayName, roomName) => {
  if (!config.jitsi.appId || !config.jitsi.appSecret) {
    return null;
  }
  
  const payload = {
    context: {
      user: {
        id: userId,
        name: displayName
      }
    },
    aud: config.jitsi.appId,
    iss: config.jitsi.appId,
    sub: config.jitsi.domain,
    room: roomName,
    exp: Math.floor(Date.now() / 1000) + 3600 // Token expires in 1 hour
  };
  
  return jwt.sign(payload, config.jitsi.appSecret);
};

// Create a new meeting
exports.createMeeting = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { title, description, startTime, endTime, participants, isRecurring, recurrencePattern } = req.body;
    const userId = req.user.id;
    
    const roomName = generateRoomName();
    
    const meeting = await Meeting.create({
      title,
      description,
      startTime,
      endTime,
      roomName,
      createdBy: userId,
      isRecurring: isRecurring || false,
      recurrencePattern: recurrencePattern || null
    }, { transaction });
    
    await MeetingParticipant.create({
      meetingId: meeting.id,
      userId,
      isHost: true
    }, { transaction });
    
    if (participants && participants.length > 0) {
      const participantRecords = participants.map(participantId => ({
        meetingId: meeting.id,
        userId: participantId,
        isHost: false
      }));
      await MeetingParticipant.bulkCreate(participantRecords, { transaction });
    }
    
    await transaction.commit();
    
    res.status(201).json({ success: true, meeting });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: 'Failed to create meeting', error: error.message });
  }
};

// Get all meetings for a user
exports.getUserMeetings = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const meetings = await Meeting.findAll({
      include: [
        { model: MeetingParticipant, where: { userId }, attributes: ['isHost'] },
        { model: User, through: { attributes: [] }, attributes: ['id', 'name'] }
      ],
      order: [['startTime', 'ASC']]
    });
    
    res.status(200).json({ success: true, meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch meetings', error: error.message });
  }
};

// Get details of a specific meeting
exports.getMeetingDetails = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const userId = req.user.id;
    
    const isParticipant = await MeetingParticipant.findOne({ where: { meetingId, userId } });
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'You are not authorized to view this meeting' });
    }
    
    const meeting = await Meeting.findByPk(meetingId, {
      include: [{ model: User, through: { attributes: ['isHost'] }, attributes: ['id', 'name', 'email'] }]
    });
    
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }
    
    const user = await User.findByPk(userId);
    const jitsiInfo = {
      domain: config.jitsi.domain,
      roomName: meeting.roomName,
      token: generateJitsiToken(user.id, user.name, meeting.roomName)
    };
    
    res.status(200).json({ success: true, meeting, jitsiInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch meeting details', error: error.message });
  }
};

// Update a meeting
exports.updateMeeting = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { meetingId } = req.params;
    const { title, description, startTime, endTime, participants, isRecurring, recurrencePattern } = req.body;
    const userId = req.user.id;
    
    const isHost = await MeetingParticipant.findOne({ where: { meetingId, userId, isHost: true } });
    if (!isHost) {
      await transaction.rollback();
      return res.status(403).json({ success: false, message: 'Only the host can update the meeting' });
    }
    
    const [updated] = await Meeting.update(
      { title, description, startTime, endTime, isRecurring, recurrencePattern },
      { where: { id: meetingId }, transaction }
    );
    
    if (!updated) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }
    
    if (participants) {
      await MeetingParticipant.destroy({ where: { meetingId, isHost: false }, transaction });
      if (participants.length > 0) {
        const participantRecords = participants.map(participantId => ({
          meetingId,
          userId: participantId,
          isHost: false
        }));
        await MeetingParticipant.bulkCreate(participantRecords, { transaction });
      }
    }
    
    await transaction.commit();
    res.status(200).json({ success: true, message: 'Meeting updated successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: 'Failed to update meeting', error: error.message });
  }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { meetingId } = req.params;
    const userId = req.user.id;
    
    const isHost = await MeetingParticipant.findOne({ where: { meetingId, userId, isHost: true } });
    if (!isHost) {
      await transaction.rollback();
      return res.status(403).json({ success: false, message: 'Only the host can delete the meeting' });
    }
    
    await MeetingParticipant.destroy({ where: { meetingId }, transaction });
    const deleted = await Meeting.destroy({ where: { id: meetingId }, transaction });
    
    if (!deleted) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }
    
    await transaction.commit();
    res.status(200).json({ success: true, message: 'Meeting deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: 'Failed to delete meeting', error: error.message });
  }
};

// Track when a user joins a meeting (Completed)
exports.joinMeeting = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const userId = req.user.id;
    
    const participant = await MeetingParticipant.findOne({ where: { meetingId, userId } });
    if (!participant) {
      return res.status(403).json({ success: false, message: 'You are not invited to this meeting' });
    }
    
    await MeetingParticipant.update(
      { hasJoined: true, joinedAt: new Date() },
      { where: { meetingId, userId } }
    );
    
    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }
    
    if (meeting.status === 'scheduled') {
      await Meeting.update({ status: 'in-progress' }, { where: { id: meetingId } });
    }
    
    const user = await User.findByPk(userId);
    const jitsiInfo = {
      domain: config.jitsi.domain,
      roomName: meeting.roomName,
      token: generateJitsiToken(user.id, user.name, meeting.roomName)
    };
    
    res.status(200).json({
      success: true,
      message: 'Successfully joined the meeting',
      jitsiInfo
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to join meeting', error: error.message });
  }
};