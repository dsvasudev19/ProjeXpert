'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Message, {
        foreignKey: 'chatRoomId',
        as: 'messages'
      });
      
      // Chat room belongs to two users (participant1 and participant2)
      this.belongsTo(models.User, {
        foreignKey: 'participant1Id',
        as: 'participant1'
      });
      this.belongsTo(models.User, {
        foreignKey: 'participant2Id',
        as: 'participant2'
      });
    }
  }
  ChatRoom.init({
    name: DataTypes.STRING,
    participant1Id: DataTypes.INTEGER,
    participant2Id: DataTypes.INTEGER,
    lastMessageAt: {
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};