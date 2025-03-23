'use strict';
const {
  Model
} = require('sequelize');
const crypto=require("crypto")
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'raisedBy', as: 'raiser' });
      this.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignee' });
      this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
      this.hasMany(models.TicketComment, { foreignKey: 'ticketId', as: 'comments' });
      this.hasMany(models.TicketAttachment, { foreignKey: 'ticketId', as: 'attachments' });
      this.hasMany(models.TicketHistory, { foreignKey: 'ticketId', as: 'history' });
    }
  }
  Ticket.init({
    refId:{
      type:DataTypes.STRING,
      defaultValue:crypto.randomBytes(3).toString("hex").toUpperCase()
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('Technical', 'Billing', 'Feature Request','Account','Bug','Resources','Permission','Other'),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
      allowNull: false,
      defaultValue: 'Medium'
    },
    status: {
      type: DataTypes.ENUM('Open', 'In Progress', 'Resolved', 'Closed', 'Reopened'),
      allowNull: false,
      defaultValue: 'Open'
    },
    raisedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignedTo: {
      type: DataTypes.INTEGER
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    resolution: {
      type: DataTypes.TEXT
    },
    resolvedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};