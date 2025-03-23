'use strict';

const router = require('express').Router();
const AuditLogController = require('./../../controllers/admin/auditLogController'); // Adjust path



// Log an audit event
router.post('/log', AuditLogController.logActivity);

// Get audit logs
router.get('/logs', AuditLogController.getAuditLogs);

module.exports = router;