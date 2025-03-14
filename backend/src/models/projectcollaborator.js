'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectCollaborator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectCollaborator.init({
    projectId: DataTypes.INTEGER,
    githubId: DataTypes.STRING,
    githubUsername: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectCollaborator',
  });
  return ProjectCollaborator;
};