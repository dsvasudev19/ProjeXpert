// Proposed new model: Milestone.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    static associate(models) {
      this.belongsTo(models.Project, {
        foreignKey: 'projectId'
      });
      this.hasMany(models.Task, {
        foreignKey: 'milestoneId'
      });
    }
  }
  Milestone.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    projectId: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    completionDate: DataTypes.DATE,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
      validate: {
        isIn: [['Pending', 'In Progress', 'Completed', 'Delayed']]
      }
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    deliverables: DataTypes.TEXT,
    clientApprovalRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    clientApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    clientApprovalDate: DataTypes.DATE,
    paymentPercentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Percentage of total project payment tied to this milestone'
    }
  }, {
    sequelize,
    modelName: 'Milestone',
  });
  return Milestone;
};