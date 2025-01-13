'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityTracker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityTracker.init({
    entityType: DataTypes.STRING,
    entityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    details: DataTypes.STRING,
    actionType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ActivityTracker',
  });
  return ActivityTracker;
};