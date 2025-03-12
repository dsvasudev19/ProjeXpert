// Proposed new model: ClientFeedback.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientFeedback extends Model {
    static associate(models) {
      this.belongsTo(models.Project, {
        foreignKey: 'projectId'
      });
      this.belongsTo(models.User, {
        foreignKey: 'clientId',
        as: 'Client'
      });
    }
  }
  ClientFeedback.init({
    projectId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    feedbackType: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['Feature', 'Bug', 'General', 'Milestone']]
      }
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'New',
      validate: {
        isIn: [['New', 'Acknowledged', 'In Progress', 'Addressed', 'Closed']]
      }
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'Medium',
      validate: {
        isIn: [['Low', 'Medium', 'High']]
      }
    },
    responseDetails: DataTypes.TEXT,
    responseDate: DataTypes.DATE,
    respondedById: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClientFeedback',
  });
  return ClientFeedback;
};