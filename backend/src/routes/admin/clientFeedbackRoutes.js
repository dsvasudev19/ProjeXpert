const express = require('express');
const router = express.Router();
const ClientFeedbackController = require('./../../controllers/admin/clientFeedbackController');

router.post('/', ClientFeedbackController.createFeedback);
router.get('/', ClientFeedbackController.getAllFeedback);
router.get('/:id', ClientFeedbackController.getFeedbackById);
router.put('/:id', ClientFeedbackController.updateFeedback);
router.delete('/:id', ClientFeedbackController.deleteFeedback);

module.exports = router;
