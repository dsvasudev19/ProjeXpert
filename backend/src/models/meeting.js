'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.MeetingParticipant, { foreignKey: 'meetingId' });
      // this.belongsToMany(models.User, { through: models.MeetingParticipant, foreignKey: 'meetingId' });
    }
  }
  Meeting.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    roomName: DataTypes.STRING,
    password: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    isRecurring: DataTypes.BOOLEAN,
    recurrencePattern: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Meeting',
  });
  return Meeting;
};