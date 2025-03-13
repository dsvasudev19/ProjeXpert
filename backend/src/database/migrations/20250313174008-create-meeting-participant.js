'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MeetingParticipants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      meetingId: {
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.INTEGER
      },
      isHost: {
        type: Sequelize.BOOLEAN
      },
      hasJoined: {
        type: Sequelize.BOOLEAN
      },
      joinedAt: {
        type: Sequelize.DATE
      },
      leftAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('MeetingParticipants');
  }
};