'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project,{
        foreignKey:"projectId"
      })
      this.belongsTo(models.User,{
        foreignKey:'userId',
        as:"Assignee"
      })
      this.belongsTo(models.Bug,{
        foreignKey:'bugId'
      })
      this.belongsTo(models.Task, {
        foreignKey: 'parentTaskId', 
        as: 'ParentTask' 
      });

      this.hasMany(models.Task, {
        foreignKey: 'parentTaskId', 
        as: 'SubTasks' 
      });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    assigneeId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    bugId: DataTypes.INTEGER,
    parentTaskId: DataTypes.INTEGER,
    progress: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};