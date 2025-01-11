'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: models.UserRole,foreignKey:'userId' });
      this.hasMany(models.Project, { as: 'ClientProjects', foreignKey: 'clientId' });
      this.hasMany(models.Project, { as: 'FreelancerProjects', foreignKey: 'freelancerId' });
      this.hasMany(models.Bug, { as: 'ReportedBugs', foreignKey: 'reportedById' });
      this.hasMany(models.Bug, { as: 'AssignedBugs', foreignKey: 'assigneeId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    lastLogin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};