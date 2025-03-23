'use strict';

const AuditLogService = require('./../../services/auditLogService'); // Adjust path

class AuditLogController {
  static async logActivity(req, res) {
    try {
      const auditEntry = await AuditLogService.logActivity(req.body);
      res.status(201).json(auditEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAuditLogs(req, res) {
    try {
      const filters = req.query; // e.g., ?userId=1&entityType=User
      const logs = await AuditLogService.getAuditLogs(filters);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuditLogController;