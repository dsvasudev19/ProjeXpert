'use strict';

const { ActivityTracker } = require('./../models'); // Adjust path to your models folder

class AuditLogService {
  /**
   * Logs an audit event
   * @param {object} data - Audit log data
   * @returns {Promise<object>} - The created audit log entry
   */
  static async logActivity(data) {
    const { entityType, entityId, userId, actionType, details } = data;
    try {
      const detailsString = typeof details === 'object' ? JSON.stringify(details) : details;
      const auditEntry = await ActivityTracker.create({
        entityType,
        entityId,
        userId,
        actionType,
        details: detailsString,
      });
      return auditEntry;
    } catch (error) {
      console.error('Error logging activity:', error);
      throw new Error('Failed to log activity');
    }
  }

  /**
   * Retrieves audit logs
   * @param {object} filters - Optional filters
   * @returns {Promise<object[]>} - Array of audit log entries
   */
  static async getAuditLogs(filters = {}) {
    try {
      const logs = await ActivityTracker.findAll({
        where: filters,
        order: [['createdAt', 'DESC']],
      });
      return logs;
    } catch (error) {
      console.error('Error retrieving audit logs:', error);
      throw new Error('Failed to retrieve audit logs');
    }
  }
}

module.exports = AuditLogService;