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
    }
  }
  TeamMember.init({
    userId: DataTypes.INTEGER,
    position: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TeamMember',
  });
  return TeamMember;
};