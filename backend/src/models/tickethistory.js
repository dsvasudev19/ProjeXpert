'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Ticket, { foreignKey: 'ticketId', as: 'ticket' });
      this.belongsTo(models.User, { foreignKey: 'changedBy', as: 'actor' });
    }
  }
  TicketHistory.init({
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    changedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fieldChanged: {
      type: DataTypes.STRING,
      allowNull: false
    },
    oldValue: DataTypes.STRING,
    newValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TicketHistory',
  });
  return TicketHistory;
};