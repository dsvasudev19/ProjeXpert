const express = require('express');
const router = express.Router();
const TimeController = require('./../../controllers/admin/timelineController');
const {authenticateUser} = require('./../../middlewares/authenticate');

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Calendar events routes
router.get('/calendar-events', TimeController.getCalendarEvents);
router.get('/employee-events/:employeeId', TimeController.getEmployeeEvents);

// Meeting routes
router.post('/meetings', TimeController.createMeeting);
router.get("/meetings/:id",TimeController.getMeetingById)
router.put('/meetings/:id', TimeController.updateMeeting);
router.delete('/meetings/:id', TimeController.deleteMeeting);

module.exports = router;