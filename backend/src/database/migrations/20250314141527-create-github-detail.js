'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GithubDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      createGithubRepo: {
        type: Sequelize.BOOLEAN
      },
      repoName: {
        type: Sequelize.STRING
      },
      repoVisibility: {
        type: Sequelize.STRING
      },
      addCollaborators: {
        type: Sequelize.BOOLEAN
      },
      repoUrl: {
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
    await queryInterface.dropTable('GithubDetails');
  }
};