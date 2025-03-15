'use strict';

const { TimeEntry, Project, Task } = require('./../../models'); // Adjust path to your models
const { Op } = require('sequelize');

const timeEntryController = {
  // Get the active timer for the current user
  getActiveTimer: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      const activeTimer = await TimeEntry.findOne({
        where: {
          userId,
          endTime: null, // Active timer has no endTime
        },
        include: [
          { model: Project},
          { model: Task},
        ],
      });

      if (!activeTimer) {
        return res.status(200).json(null); // No active timer
      }
      
      // Format response with project and task names
      const response = {
        id: activeTimer.id,
        projectId: activeTimer.projectId,
        projectName: activeTimer.Project?.name || `Project ${activeTimer.projectId}`,
        taskId: activeTimer.taskId,
        taskName: activeTimer.Task?.name || `Task ${activeTimer.taskId}`,
        description: activeTimer.description,
        startTime: activeTimer.startTime,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching active timer:', error);
      res.status(500).json({ message: 'Server error fetching active timer' });
    }
  },

  // Start a new timer
  startTimer: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      const { projectId, taskId, description } = req.body;

      // Check if there's already an active timer
      const existingTimer = await TimeEntry.findOne({
        where: { userId, endTime: null },
      });
      if (existingTimer) {
        return res.status(400).json({ message: 'An active timer already exists' });
      }

      // Verify project and task exist
      const project = await Project.findByPk(projectId);
      const task = await Task.findByPk(taskId);
      if (!project || !task) {
        return res.status(400).json({ message: 'Invalid projectId or taskId' });
      }

      const newTimer = await TimeEntry.create({
        userId,
        projectId,
        taskId,
        description: description || '',
        startTime: new Date(),
        endTime: null, // Active timer
        duration: 0, // Will be calculated on stop
        billable: false, // Default, adjust as needed
        billableRate: 0, // Default
        approved: false, // Default
        approvedById: null, // Default
        approvedAt: null, // Default
      });

      const response = {
        id: newTimer.id,
        projectId: newTimer.projectId,
        projectName: project.name || `Project ${projectId}`,
        taskId: newTimer.taskId,
        taskName: task.name || `Task ${taskId}`,
        description: newTimer.description,
        startTime: newTimer.startTime,
      };

      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error('Error starting timer:', error);
      res.status(500).json({ message: 'Server error starting timer' });
    }
  },

  // Stop an existing timer
  stopTimer: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      const { id } = req.params;
      const { description } = req.body;

      const timer = await TimeEntry.findOne({
        where: { id, userId, endTime: null }, // Only stop active timers
      });

      if (!timer) {
        return res.status(404).json({ message: 'No active timer found with this ID' });
      }

      // Calculate duration in hours (decimal)
      const startTime = new Date(timer.startTime);
      const endTime = new Date();
      const durationMs = endTime - startTime;
      const durationHours = durationMs / (1000 * 60 * 60); // Convert to hours

      await timer.update({
        description: description || timer.description,
        endTime,
        duration: parseFloat(durationHours.toFixed(2)), // Store as decimal
      });

      res.status(200).json({ success: true, message: 'Timer stopped successfully' });
    } catch (error) {
      console.error('Error stopping timer:', error);
      res.status(500).json({ message: 'Server error stopping timer' });
    }
  },

 

};

module.exports = timeEntryController;