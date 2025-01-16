const { Project, Task, TeamMember,File } = require("../../models");
const { Sequelize } = require("./../../models")
const moment = require('moment');

const getDashboardData = async (req, res, next) => {
  const currentDate = new Date();

  // Get the start and end of the current week (from Sunday to Saturday)
  const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Start of the current week (Sunday)
  const endOfWeek = new Date(new Date(startOfWeek).setDate(startOfWeek.getDate() + 7)); // End of the current week (Saturday)

  // Reset the current date after manipulation
  currentDate.setHours(0, 0, 0, 0); // Set time to the start of the day for accurate comparisons

  try {
    // Fetch all necessary data concurrently using Promise.all
    const [
      tasksCompletedThisWeek,
      tasksInProgressDueThisWeek,
      tasksDueThisWeekPending,
      totalActiveProjects,
      projectsDueThisWeek,
      totalProjects
    ] = await Promise.all([
      Task.count({
        where: {
          status: 'Completed',
          updatedAt: {
            [Sequelize.Op.gte]: startOfWeek, // Completed this week
            [Sequelize.Op.lt]: endOfWeek
          }
        }
      }),

      Task.count({
        where: {
          status: 'In Progress',
          dueDate: {
            [Sequelize.Op.gte]: currentDate, // In progress and due this week
            [Sequelize.Op.lt]: endOfWeek
          }
        }
      }),

      Task.count({
        where: {
          status: 'Pending',
          dueDate: {
            [Sequelize.Op.gte]: currentDate, // Pending tasks due this week
            [Sequelize.Op.lt]: endOfWeek
          }
        }
      }),

      Project.count({
        where: {
          status: 'active' // Active projects
        }
      }),

      Project.count({
        where: {
          endDate: {
            [Sequelize.Op.gte]: currentDate, // Projects due this week
            [Sequelize.Op.lt]: endOfWeek
          }
        }
      }),

      Project.count()
    ]);

    return res.json({
      tasksCompletedThisWeek,
      tasksInProgressDueThisWeek,
      tasksDueThisWeekPending,
      totalActiveProjects,
      projectsDueThisWeek,
      totalProjects
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


const getDashboardOverview = async (req, res) => {
  try {
    // Project-related statistics
    const totalProjects = await Project.count();
    const activeProjects = await Project.count({ where: { status: 'active' } });
    const completedProjects = await Project.count({ where: { status: 'completed' } });

    // Task-related statistics
    const totalTasks = await Task.count();
    const completedTasks = await Task.count({ where: { status: 'completed' } });
    const taskCompletionPercentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

    // Team-related statistics
    const totalTeamMembers = await TeamMember.count();
    const activeMembers = await TeamMember.count({ where: { status: 'active' } });

    // Budget-related statistics
    const totalBudget = await Project.sum('budget');

    // Total Hours from tasks (assuming `hoursSpent` is a field in Task)
    const totalHours = Math.ceil(Math.random() * 90);  // Simulated data for now

    // Documents statistics (File model)
    const totalDocuments = await File.count();


    // Return the response grouped by categories
    return res.status(200).json({
      projects: {
        total: totalProjects,
        active: activeProjects,
        completed: completedProjects
      },
      tasks: {
        completionPercentage: taskCompletionPercentage,
        completed: completedTasks,
        total: totalTasks
      },
      team: {
        totalMembers: totalTeamMembers,
        activeNow: activeMembers
      },
      budget: {
        total: `${totalBudget.toLocaleString()}`
      },
      hours: {
        total: `${totalHours}`
      },
      documents: {
        total: totalDocuments
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching team overview', error });
  }
};


module.exports = {
  getDashboardData,
  getDashboardOverview
};
