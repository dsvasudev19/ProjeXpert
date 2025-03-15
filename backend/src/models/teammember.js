'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      this.belongsTo(models.Team,{foreignKey:'teamId'})
      this.belongsToMany(models.Project, { foreignKey: 'teamMemberId', through:models.ProjectAssignment });
    }
  }
  TeamMember.init({
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    position: DataTypes.STRING,
    status: DataTypes.STRING,
    dateJoined: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TeamMember',
  });
  return TeamMember;
};