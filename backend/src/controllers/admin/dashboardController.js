const { Project, Task } = require("../../models");
const {Sequelize}=require("./../../models")
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

module.exports = {
  getDashboardData
};
