'use strict';
const {
  Model
} = require('sequelize');
const crypto=require("crypto")
module.exports = (sequelize, DataTypes) => {
  class TicketComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Ticket, { foreignKey: 'ticketId', as: 'ticket' });
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'commenter' });
    }
  }
  TicketComment.init({
    refId:{
      type:DataTypes.STRING,
      defaultValue:crypto.randomBytes(3).toString("hex").toUpperCase()
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TicketComment',
  });
  return TicketComment;
};