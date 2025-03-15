'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project, {
        foreignKey: 'projectId'
      });
      this.belongsTo(models.User, { as: 'Reporter', foreignKey: 'reportedById' });
      this.belongsTo(models.User, { as: 'Assignee', foreignKey: 'assigneeId' });
    }
  }
  Bug.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type:DataTypes.ENUM,
      values:['open','in-progress','resolved','closed','reopened']
    },
    priority: {
      type:DataTypes.ENUM,
      values:['low','medium','high','critical']
    },
    dueDate: DataTypes.DATE,
    resolution: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    reportedById: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
    tags:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bug',
  });
  return Bug;
};