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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Projects', key: 'id' },
    },
    dueDate: {
      type: DataTypes.DATEONLY,
    },
    completionDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'In Progress', 'Completed', 'Delayed'),
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER,
      validate: { min: 0, max: 100 },
    },
    deliverables: {
      type: DataTypes.TEXT,
    },
    clientApprovalRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    clientApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    clientApprovalDate: {
      type: DataTypes.DATEONLY,
    },
    paymentPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      validate: { min: 0, max: 100 },
    },
  }, {
    sequelize,
    modelName: 'Milestone',
  });
  return Milestone;
};