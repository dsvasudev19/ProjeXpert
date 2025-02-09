const express = require('express');
const router = express.Router();
const exportController = require('../../controllers/admin/exportController');
const { authenticateUser } = require('../../middlewares/authenticate');
const { checkRole } = require('../../middlewares/authorize');

// Route to export data (admin only)
router.get('/:type', 
  authenticateUser, 
  checkRole(['admin']), 
  exportController.exportData
);

module.exports = router; 