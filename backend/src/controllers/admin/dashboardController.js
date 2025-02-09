const { Project, Task, TeamMember,File, User, Role } = require("../../models");
const { Sequelize } = require("./../../models")
const moment = require('moment');

const getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Role }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userRole = user.Roles[0].name;
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const endOfWeek = new Date(new Date(startOfWeek).setDate(startOfWeek.getDate() + 7));
    currentDate.setHours(0, 0, 0, 0);

    // Set conditions based on user role
    let projectWhereCondition = {};
    let taskWhereCondition = {};

    if (userRole !== 'admin') {
      projectWhereCondition.clientId = userId;
      taskWhereCondition[Sequelize.Op.or] = [
        { assigneeId: userId },
        { createdBy: userId }
      ];
    }

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
          ...taskWhereCondition,
          status: 'Completed',
          updatedAt: {
            [Sequelize.Op.gte]: startOfWeek,
            [Sequelize.Op.lt]: endOfWeek
          }
        }
      }),

      Task.count({
        where: {
          ...taskWhereCondition,
          status: 'In Progress',
          dueDate: {
            [Sequelize.Op.gte]: currentDate,
            [Sequelize.Op.lt]: endOfWeek
          }
        }
      }),

      Task.count({
        where: {
          ...taskWhereCondition,
          status: 'Pending',
          dueDate: {
            [Sequelize.Op.gte]: currentDate,
            [Sequelize.Op.lt]: endOfWeek
          }
        }
      }),

      Project.count({
        where: {
          ...projectWhereCondition,
          status: 'active'
        }
      }),

      Project.count({
        where: {
          ...projectWhereCondition,
          endDate: {
            [Sequelize.Op.gte]: currentDate,
            [Sequelize.Op.lt]: endOfWeek
          }
        }
      }),

      Project.count({
        where: projectWhereCondition
      })
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
    const userId = req.user.id;
    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Role }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userRole = user.Roles[0].name;

    // Set conditions based on user role
    let projectWhereCondition = {};
    let taskWhereCondition = {};

    if (userRole !== 'admin') {
      projectWhereCondition.clientId = userId;
      taskWhereCondition[Sequelize.Op.or] = [
        { assigneeId: userId },
        { createdBy: userId }
      ];
    }

    // Project-related statistics
    const totalProjects = await Project.count({ where: projectWhereCondition });
    const activeProjects = await Project.count({ 
      where: { ...projectWhereCondition, status: 'active' } 
    });
    const completedProjects = await Project.count({ 
      where: { ...projectWhereCondition, status: 'completed' } 
    });

    // Task-related statistics
    const totalTasks = await Task.count({ where: taskWhereCondition });
    const completedTasks = await Task.count({ 
      where: { ...taskWhereCondition, status: 'completed' } 
    });
    const taskCompletionPercentage = totalTasks > 0 ? 
      ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

    // Team-related statistics (only for admin)
    const teamWhereCondition = userRole !== 'admin' ? { userId } : {};
    const totalTeamMembers = await TeamMember.count({ where: teamWhereCondition });
    const activeMembers = await TeamMember.count({ 
      where: { ...teamWhereCondition, status: 'active' } 
    });

    // Budget-related statistics
    const totalBudget = await Project.sum('budget', { where: projectWhereCondition });

    // Documents statistics
    const fileWhereCondition = userRole !== 'admin' ? {
      [Sequelize.Op.or]: [
        { uploaderId: userId }
      ]
    } : {};

    const totalDocuments = await File.count({
      where: fileWhereCondition
    });

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
        total: totalBudget ? totalBudget.toLocaleString() : '0'
      },
      hours: {
        total: Math.ceil(Math.random() * 90)  // Keeping the simulated data
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
