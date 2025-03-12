'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Maintaining existing associations
      this.belongsTo(models.User, { as: 'Client', foreignKey: 'clientId' });
      this.hasMany(models.Bug, {
        foreignKey: 'projectId'
      });
      this.hasMany(models.Payment, {
        foreignKey: 'projectId'
      });
      this.hasMany(models.Task, {
        foreignKey: 'projectId',
      });
      this.hasMany(models.File, {
        foreignKey: 'projectId'
      });
      this.belongsToMany(models.TeamMember, { 
        foreignKey: 'projectId', 
        through: models.ProjectAssignment 
      });
      
      // // New associations might be needed
      // // Add departments association
      // this.belongsToMany(models.Department, {
      //   foreignKey: 'projectId',
      //   through: 'ProjectDepartment'
      // });
    }
  }
  
  Project.init({
    // Core Project Information
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    projectType: DataTypes.STRING,
    clientInfo: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Not Started',
      validate: {
        isIn: [['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled']]
      }
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'Medium',
      validate: {
        isIn: [['Low', 'Medium', 'High', 'Critical']]
      }
    },
    
    // Timeline Information
    startDate: DataTypes.DATE,
    targetEndDate: DataTypes.DATE,
    estimatedDuration: DataTypes.INTEGER,
    
    // Resource Management
    projectManager: DataTypes.INTEGER,

    // Financial Information
    budget: DataTypes.DECIMAL(10, 2),
    billingRate: DataTypes.DECIMAL(10, 2),
    revenueProjection: DataTypes.DECIMAL(10, 2),
    
    // Scope Information
    projectGoals: DataTypes.TEXT,
    deliverables: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    constraints: DataTypes.TEXT,
    acceptanceCriteria: DataTypes.TEXT,
    
    // GitHub Repository Settings
    hasGithubRepo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    repoName: DataTypes.STRING,
    repoVisibility: {
      type: DataTypes.STRING,
      defaultValue: 'private',
      validate: {
        isIn: [['private', 'public', 'internal']]
      }
    },
    repoCollaborators: DataTypes.TEXT, // Stored as comma-separated values
    
    // Maintaining the existing clientId for association
    clientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
    paranoid:true
  });
  
  return Project;
};