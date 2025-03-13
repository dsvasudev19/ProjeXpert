'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DashboardConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DashboardConfig.init({
    userId: DataTypes.INTEGER,
    layout: DataTypes.JSON,
    enabledWidgets: DataTypes.JSON,
    theme: DataTypes.STRING,
    defaultView: DataTypes.STRING,
    notifications: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'DashboardConfig',
  });
  return DashboardConfig;
};