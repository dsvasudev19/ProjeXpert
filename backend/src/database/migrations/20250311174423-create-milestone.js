'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Milestones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      dueDate: {
        type: Sequelize.DATE
      },
      completionDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      progress: {
        type: Sequelize.INTEGER
      },
      deliverables: {
        type: Sequelize.TEXT
      },
      clientApprovalRequired: {
        type: Sequelize.BOOLEAN
      },
      clientApproved: {
        type: Sequelize.BOOLEAN
      },
      clientApprovalDate: {
        type: Sequelize.DATE
      },
      paymentPercentage: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Milestones');
  }
};