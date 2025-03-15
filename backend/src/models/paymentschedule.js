'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project,{
        foreignKey:'projectId'
      });
    }
  }
  PaymentSchedule.init({
    milestoneTitle: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    percentage: DataTypes.FLOAT,
    amount: DataTypes.DOUBLE,
    clientApproval: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentSchedule',
  });
  return PaymentSchedule;
};