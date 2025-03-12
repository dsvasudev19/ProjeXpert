// Proposed new model: Notification.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'Recipient'
      });
    }
  }
  Notification.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    message: DataTypes.TEXT,
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['Project', 'Task', 'Bug', 'Payment', 'System', 'Message']]
      }
    },
    relatedEntityType: DataTypes.STRING,
    relatedEntityId: DataTypes.INTEGER,
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    readAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};