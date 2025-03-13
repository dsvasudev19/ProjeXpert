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
    projectId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    feedbackType: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    responseDetails: DataTypes.TEXT,
    responseDate: DataTypes.DATE,
    respondedById: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClientFeedback',
  });
  return ClientFeedback;
};