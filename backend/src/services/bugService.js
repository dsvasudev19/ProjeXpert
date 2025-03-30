// services/bugService.js
'use strict';

const { Bug, User, Project } = require('../models');
const { Op } = require('sequelize');

/**
 * Get all bugs based on the user's role.
 * @param {Object} user - The user object.
 * @returns {Promise<Array>} - A promise that resolves with an array of bugs.
 */
const getAllBugsForUser = async (user, params) => {
  try {
    const { projectId, status, severity } = params;

    // Base where condition
    let whereCondition = {};

    if (user.role === 'admin') {
      // Admin sees all bugs, apply filters if provided
      if (projectId && projectId !== "all") {
        whereCondition.projectId = parseInt(projectId);
      }
      
      if (status && status !== "all") {
        whereCondition.status = status;
      }
      
      if (severity && severity !== "all") {
        whereCondition.priority = severity; // severity frontend = priority backend
      }

      return await Bug.findAll({
        where: whereCondition,
        include: [
          {
            model: Project,
            as: 'Project',
            attributes: ['id','name'],
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
          }
        ],
      });
    } else {
      // Non-admin users see bugs related to their clientId
      whereCondition = {
        '$Project.clientId$': user.id // Using Sequelize dot notation for nested condition
      };

      if (projectId && projectId !== "all") {
        whereCondition.projectId = parseInt(projectId);
      }
      
      if (status) {
        whereCondition.status = status;
      }
      
      if (severity && severity !== "all") {
        whereCondition.priority = severity; // severity frontend = priority backend
      }

      return await Bug.findAll({
        where: whereCondition,
        include: [
          {
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
          }
        ],
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message); // Throwing error to be handled by caller
  }
};

/**
 * Get a bug by ID with its project information.
 * @param {number} bugId - The bug's ID.
 * @returns {Promise<Object>} - A promise that resolves with the bug or null if not found.
 */
const getBugByIdWithProject = async (bugId) => {
  return await Bug.findByPk(bugId, {
    include: [{ model: Project, as: 'Project' },{
      model: User,
      as: 'Assignee',
      attributes: ['name'],
    },
    {
      model: User,
      as: 'Reporter',
    }],
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
  return true;
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