'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: models.RolePermission,foreignKey:'permissionId' });
      this.belongsToMany(models.User,{through:models.UserPermission,foreignKey:'permissionId'})
    }
  }
  Permission.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    resource: DataTypes.STRING,
    action: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};