// Proposed new model: TimeEntry.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeEntry extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      this.belongsTo(models.Project, {
        foreignKey: 'projectId'
      });
      this.belongsTo(models.Task, {
        foreignKey: 'taskId',
        allowNull: true
      });
    }
  }
  TimeEntry.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: DataTypes.TEXT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    duration: {
      type: DataTypes.DECIMAL(10,2),
      comment: 'Duration in hours'
    },
    billable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    billableRate: DataTypes.DECIMAL(10,2),
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approvedById: DataTypes.INTEGER,
    approvedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TimeEntry',
  });
  return TimeEntry;
};