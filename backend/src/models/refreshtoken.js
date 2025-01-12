'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init({
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expiryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });

  
  return RefreshToken;
};