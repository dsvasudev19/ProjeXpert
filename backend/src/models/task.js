'use strict';
const {
  Model
} = require('sequelize');
const crypto=require("crypto")
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
        foreignKey:"projectId",
        onDelete:'CASCADE'
      })
      this.belongsTo(models.User,{
        foreignKey:'assigneeId',
        as:"Assignee",
        onDelete:'CASCADE'
      })
      // this.belongsTo(models.Bug,{
      //   foreignKey:'bugId'
      // })
      this.belongsTo(models.Task, {
        foreignKey: 'parentTaskId', 
        as: 'ParentTask' ,
        allowNull: true ,
        onDelete:'CASCADE'
      });

      this.hasMany(models.Task, {
        foreignKey: 'parentTaskId', 
        as: 'SubTasks' ,
        allowNull: true ,
        onDelete:'CASCADE'
      });
    }
  }
  Task.init({
    refId:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    assigneeId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    bugId: DataTypes.INTEGER,
    parentTaskId: {type:DataTypes.INTEGER,allowNull: true },
    progress: DataTypes.INTEGER,
    tags:DataTypes.STRING,
    createdBy:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};