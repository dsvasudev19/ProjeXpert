'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ChatRoom, {
        foreignKey: 'chatRoomId',
        as: 'chatRoom'
      });
      
      // Message belongs to a sender (User)
      this.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender'
      });
    }
  }
  Message.init({
    chatRoomId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    isRead: DataTypes.BOOLEAN,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};