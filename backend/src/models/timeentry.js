'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project,{
        foreignKey:'projectId'
      })
      this.belongsTo(models.Task,{foreignKey:"taskId"})
    }
  }
  TimeEntry.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    duration: DataTypes.DECIMAL,
    billable: DataTypes.BOOLEAN,
    billableRate: DataTypes.DECIMAL,
    approved: DataTypes.BOOLEAN,
    approvedById: DataTypes.INTEGER,
    approvedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TimeEntry',
  });
  return TimeEntry;
};