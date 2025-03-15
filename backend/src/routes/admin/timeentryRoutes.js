'use strict';

const express = require('express');
const router = express.Router();
const timeEntryController = require('../../controllers/admin/timeentryController'); // Adjust path
const {authenticateUser} = require('./../../middlewares/authenticate'); // Adjust path, assumed middleware

router.use(authenticateUser);
// Timer routes (protected by auth)
router.get('/active',  timeEntryController.getActiveTimer);
router.post('/start',  timeEntryController.startTimer);
router.put('/:id/stop',  timeEntryController.stopTimer);


module.exports = router;