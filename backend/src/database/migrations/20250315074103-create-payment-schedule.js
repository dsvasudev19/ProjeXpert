'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      milestoneTitle: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      dueDate: {
        type: Sequelize.DATE
      },
      percentage: {
        type: Sequelize.FLOAT
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      clientApproval: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaymentSchedules');
  }
};