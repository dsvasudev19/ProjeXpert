'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GithubDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project, { foreignKey: 'projectId' });
    }
  }
  GithubDetail.init({
    projectId: DataTypes.INTEGER,
    createGithubRepo: DataTypes.BOOLEAN,
    repoName: DataTypes.STRING,
    repoVisibility: DataTypes.STRING,
    addCollaborators: DataTypes.BOOLEAN,
    repoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GithubDetail',
  });
  return GithubDetail;
};