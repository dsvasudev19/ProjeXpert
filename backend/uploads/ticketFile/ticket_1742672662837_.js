'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserPermission.init({
  }, {
    sequelize,
    modelName: 'UserPermission',
  });
  return UserPermission;
};models.User,{through:models.UserPermission,foreignKey:'permissionId'})
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
};Many(models.Task,{
        foreignKey:'userId',
        as:"Tasks"
      })
      this.hasMany(models.ChatRoom, {
        foreignKey: 'participant1Id',
        as: 'chatRoomsAsParticipant1'
      });
      this.hasMany(models.ChatRoom, {
        foreignKey: 'participant2Id',
        as: 'chatRoomsAsParticipant2'
      });
      this.hasMany(models.Message, {
        foreignKey: 'senderId',
        as: 'sentMessages'
      });
      this.belongsToMany(models.Permission,{
        foreignKey:'userId',
        through:models.UserPermission
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    phone:DataTypes.STRING,
    githubId:DataTypes.STRING,
    githubUsername:DataTypes.STRING,
    avatar:DataTypes.STRING,
    bio:DataTypes.TEXT,
    userType:{
      type:DataTypes.STRING,
      defaultValue:'client'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};