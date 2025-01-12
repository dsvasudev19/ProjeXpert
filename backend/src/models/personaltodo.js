'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalTodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonalTodo.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    reminder: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    repeatInterval: DataTypes.STRING,
    repeatUntil: DataTypes.DATE,
    labels: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'PersonalTodo',
  });
  return PersonalTodo;
};