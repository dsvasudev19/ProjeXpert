// routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const meetingController = require('../../controllers/admin/meetingController');
const {authenticateUser} = require('../../middlewares/authenticate');

// Routes with authentication middleware
router.post('/', authenticateUser, meetingController.createMeeting);
router.get('/', authenticateUser, meetingController.getUserMeetings);
router.get('/:meetingId', authenticateUser, meetingController.getMeetingDetails);
router.put('/:meetingId', authenticateUser, meetingController.updateMeeting);
router.delete('/:meetingId', authenticateUser, meetingController.deleteMeeting);
router.post('/:meetingId/join', authenticateUser, meetingController.joinMeeting);

module.exports = router;