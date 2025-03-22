'use strict';
const {
  Model
} = require('sequelize');
const crypto=require("crypto")
module.exports = (sequelize, DataTypes) => {
  class TicketAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Ticket, { foreignKey: 'ticketId', as: 'ticket' });
      this.belongsTo(models.User, { foreignKey: 'uploadedBy', as: 'uploader' });
    }
  }
  TicketAttachment.init({
    refId:{
      type:DataTypes.STRING,
      defaultValue:crypto.randomBytes(3).toString("hex").toUpperCase()
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileType: DataTypes.STRING,
    fileSize: DataTypes.INTEGER,
    filePath: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      get() {
        const path = this.getDataValue('filePath');
        return path ? process.env.BACKEND_URL+`/${path}` : null;
      }
    }
  }, {
    sequelize,
    modelName: 'TicketAttachment',
  });
  return TicketAttachment;
};