// services/bugService.js
'use strict';

const { Bug, User, Project } = require('../models');
const { Op } = require('sequelize');

/**
 * Get all bugs based on the user's role.
 * @param {Object} user - The user object.
 * @returns {Promise<Array>} - A promise that resolves with an array of bugs.
 */
const getAllBugsForUser = async (user) => {
  if (user.role === 'admin') {
    return await Bug.findAll({
      include: [{
        model: Project,
        as: 'Project',
        attributes: ['name'],
      },
      {
        model: User,
        as: 'Assignee',
        attributes: ['name'],
      },
      {
        model: User,
        as: 'Reporter',
        attributes: ['name'],
      }],
    });
  } else {
    return await Bug.findAll({
      include: [
        {
          model: Project,
          as: 'Project',
          attributes: ['name'],
          where: { [Op.or]: [{ clientId: user.id }] },
        },
        {
          model: User,
          as: 'Assignee',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'Reporter',
        },
      ],
    });
  }
};

/**
 * Get a bug by ID with its project information.
 * @param {number} bugId - The bug's ID.
 * @returns {Promise<Object>} - A promise that resolves with the bug or null if not found.
 */
const getBugByIdWithProject = async (bugId) => {
  return await Bug.findByPk(bugId, {
    include: [{ model: Project, as: 'Project' }],
  });
};

/**
 * Create a new bug.
 * @param {Object} bugData - The bug data.
 * @returns {Promise<Object>} - A promise that resolves with the newly created bug.
 */
const createBug = async (bugData) => {
  return await Bug.create(bugData);
};

/**
 * Update an existing bug.
 * @param {Object} bug - The bug instance.
 * @param {Object} updates - The fields to update.
 * @returns {Promise<Object>} - A promise that resolves with the updated bug.
 */
const updateBug = async (bug, updates) => {
  Object.assign(bug, updates);
  return await bug.save();
};

/**
 * Delete a bug.
 * @param {Object} bug - The bug instance.
 * @returns {Promise} - A promise that resolves when the bug is deleted.
 */
const deleteBug = async (bug) => {
  return await bug.destroy();
};

/**
 * Resolve a bug.
 * @param {Object} bug - The bug instance.
 * @param {string} resolution - The resolution text.
 * @returns {Promise<Object>} - A promise that resolves with the updated bug.
 */
const resolveBug = async (bug, resolution) => {
  bug.resolution = resolution;
  bug.status = 'resolved';
  return await bug.save();
};

/**
 * Check if a user is authorized to access a bug.
 * @param {Object} user - The current user.
 * @param {Object} bug - The bug instance (with Project included).
 * @returns {boolean} - Whether the user is authorized.
 */
const isUserAuthorized = (user, bug) => {
  if (user.role === 'admin') return true;
  return bug.Project && (bug.Project.clientId === user.id || bug.Project.freelancerId === user.id);
};

/**
 * Get all bugs for a specific project.
 * @param {number} projectId - The ID of the project.
 * @param {boolean} include - Whether to include associated models (default: false).
 * @returns {Promise<Array>} - A promise that resolves with an array of bugs for the project.
 */
const getBugsByProjectId = async (projectId, include = false) => {
  const queryOptions = {
    where: { projectId },
    order: [['createdAt', 'DESC']], // Optional: Sort by creation date, newest first
  };

  if (include) {
    queryOptions.include = [
      {
        model: Project,
        as: 'Project',
        attributes: ['id', 'name'], // Include minimal project details
      },
      {
        model: User,
        as: 'Assignee',
        attributes: ['id', 'name'], // Include assignee details
      },
      {
        model: User,
        as: 'Reporter',
        attributes: ['id', 'name'], // Include reporter details
      },
    ];
  }

  return await Bug.findAll(queryOptions);
};

module.exports = {
  getAllBugsForUser,
  getBugByIdWithProject,
  createBug,
  updateBug,
  deleteBug,
  resolveBug,
  isUserAuthorized,
  getBugsByProjectId, // Export the updated method
};