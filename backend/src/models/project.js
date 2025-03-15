'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: 'Client', foreignKey: 'clientId' });
      this.hasMany(models.Bug,{
        foreignKey:'projectId'
      });
      this.hasMany(models.Payment,{
        foreignKey:'projectId'
      });
      this.hasMany(models.Task,{
        foreignKey:'projectId',
      })
      this.hasMany(models.File,{
        foreignKey:'projectId'
      })
      this.belongsToMany(models.TeamMember, { foreignKey: 'projectId', through:models.ProjectAssignment });
      this.hasMany(models.ClientFeedback,{
        foreignKey:'projectId'
      })
      this.hasMany(models.Milestone,{
        foreignKey:'projectId'
      })
      this.hasOne(models.GithubDetail, { foreignKey: 'projectId', as: 'GithubDetails' });
      this.hasMany(models.ProjectCollaborator,{foreignKey:'projectId',as:'collaborators'})
      this.belongsToMany(models.Department, {foreignKey: 'projectId' , through: models.ProjectDepartment });
      this.belongsTo(models.User,{foreignKey:'projectManager',as:'ProjectManager'})
      this.hasMany(models.PaymentSchedule,{
        foreignKey:'projectId'
      });
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    projectType: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed', 'On Hold','Cancelled'),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High','Critical'),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    estimatedDuration: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.DECIMAL(15, 2),
    },
    billingRate: {
      type: DataTypes.DECIMAL(10, 2),
    },
    revenueProjection: {
      type: DataTypes.DECIMAL(15, 2),
    },
    projectGoals: {
      type: DataTypes.TEXT,
    },
    deliverables: {
      type: DataTypes.TEXT,
    },
    requirements: {
      type: DataTypes.TEXT,
    },
    constraints: {
      type: DataTypes.TEXT,
    },
    acceptanceCriteria: {
      type: DataTypes.TEXT,
    },
    clientId: {
      type: DataTypes.INTEGER,
    },
    projectManager: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};