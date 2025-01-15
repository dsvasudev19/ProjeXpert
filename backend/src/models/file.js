'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  File.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.INTEGER,
    path: {
      type: DataTypes.STRING,
      get url() {
        return `http://localhost:3000/${this.path}`;
      }
    },
    uploaderId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};