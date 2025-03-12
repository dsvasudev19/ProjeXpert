'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeetingParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MeetingParticipant.init({
    meetingId: DataTypes.UUID,
    userId: DataTypes.INTEGER,
    isHost: DataTypes.BOOLEAN,
    hasJoined: DataTypes.BOOLEAN,
    joinedAt: DataTypes.DATE,
    leftAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MeetingParticipant',
  });
  return MeetingParticipant;
};