'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
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
  Milestone.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    projectId: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    completionDate: DataTypes.DATE,
    status: DataTypes.STRING,
    progress: DataTypes.INTEGER,
    deliverables: DataTypes.TEXT,
    clientApprovalRequired: DataTypes.BOOLEAN,
    clientApproved: DataTypes.BOOLEAN,
    clientApprovalDate: DataTypes.DATE,
    paymentPercentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Milestone',
  });
  return Milestone;
};