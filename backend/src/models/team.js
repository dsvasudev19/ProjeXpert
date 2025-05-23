'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TeamMember,{
        foreignKey:'teamId'
      })
      this.belongsTo(models.User,{
        foreignKey:"leadId",
        as:"Lead"
      })
      this.belongsTo(models.Department,{foreignKey:'departmentId'})
    }
  }
  Team.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    leadId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};