// Proposed new model: DashboardConfig.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DashboardConfig extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  DashboardConfig.init({
    userId: DataTypes.INTEGER,
    layout: {
      type: DataTypes.JSON,
      comment: 'Stores the widget layout configuration'
    },
    enabledWidgets: {
      type: DataTypes.JSON,
      comment: 'Lists enabled widgets and their settings'
    },
    theme: {
      type: DataTypes.STRING,
      defaultValue: 'light'
    },
    defaultView: {
      type: DataTypes.STRING,
      defaultValue: 'projects'
    },
    notifications: {
      type: DataTypes.JSON,
      comment: 'Notification preferences'
    }
  }, {
    sequelize,
    modelName: 'DashboardConfig',
  });
  return DashboardConfig;
};