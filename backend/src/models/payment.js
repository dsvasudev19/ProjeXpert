'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
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
  Payment.init({
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
      allowNull: false,
    },
    dueDate:{type:DataTypes.DATE},
    percentage:{type:DataTypes.FLOAT},
    clientApproved:{type:DataTypes.BOOLEAN},
    paymentDate: {
      type: DataTypes.DATE,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    transactionId: {
      type: DataTypes.STRING,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};