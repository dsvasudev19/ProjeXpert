'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: 'Client', foreignKey: 'clientId' });
      this.hasMany(models.Bug,{
        foreignKey:'projectId'
      });
      this.hasMany(models.Payment,{
        foreignKey:'projectId'
      });
      this.hasMany(models.Task,{
        foreignKey:'projectId',
      })
      this.hasMany(models.File,{
        foreignKey:'projectId'
      })
      this.belongsToMany(models.TeamMember, { foreignKey: 'projectId', through:models.ProjectAssignment });
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    budget: DataTypes.DECIMAL,
    priority: DataTypes.STRING,
    clientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};