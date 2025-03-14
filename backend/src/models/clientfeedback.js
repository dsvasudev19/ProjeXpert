'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientFeedback extends Model {
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
    }
  }
  ClientFeedback.init({
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    feedbackType: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Open', 'In Review', 'Resolved'),
      defaultValue: 'Open',
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
    },
    responseDetails: {
      type: DataTypes.TEXT,
    },
    responseDate: {
      type: DataTypes.DATE,
    },
    respondedById: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'ClientFeedback',
  });
  return ClientFeedback;
};