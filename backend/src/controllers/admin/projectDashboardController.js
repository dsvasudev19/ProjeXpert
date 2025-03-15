const { 
    Project, 
    Bug, 
    Task, 
    TeamMember, 
    Milestone,
    sequelize 
  } = require('../../models');
  const { Op } = require('sequelize');
  
  // Controller for dashboard data
  const dashboardController = {
    /**
     * Get all data needed for the project management dashboard
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getDashboardData(req, res) {
      try {
        // Get counts for tasks
        const taskCounts = await Task.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
            [sequelize.fn('SUM', sequelize.literal('CASE WHEN status = "completed" THEN 1 ELSE 0 END')), 'completed'],
            [sequelize.fn('SUM', sequelize.literal('CASE WHEN status != "completed" THEN 1 ELSE 0 END')), 'pending']
          ],
          raw: true
        });
        
        // Get project counts
        const projectCounts = await Project.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
            [sequelize.fn('SUM', sequelize.literal('CASE WHEN status = "In Progress" THEN 1 ELSE 0 END')), 'active'],
            [sequelize.fn('SUM', sequelize.literal('CASE WHEN status = "Completed" THEN 1 ELSE 0 END')), 'completed']
          ],
          raw: true
        });
        
        // Get bug counts by priority
        const bugCounts = await Bug.findAll({
          attributes: [
            'priority',
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
          ],
          where: {
            status: {
              [Op.notIn]: ['resolved', 'closed']
            }
          },
          group: ['priority'],
          raw: true
        });
        
        // Get team member count
        const teamMemberCount = await TeamMember.count({
          where: {
            status: 'active'
          }
        });
        
        // Get new team members joined this month
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const newTeamMembers = await TeamMember.count({
          where: {
            dateJoined: {
              [Op.gte]: firstDayOfMonth
            }
          }
        });
        
        // Calculate task completion rate
        const completedTasks = taskCounts[0].completed || 0;
        const totalTasks = taskCounts[0].total || 1; // Prevent division by zero
        const taskCompletionRate = Math.round((completedTasks / totalTasks) * 100);
        
        // Get projects completed this month
        const projectsCompletedThisMonth = await Project.count({
          where: {
            status: 'Completed',
            updatedAt: {
              [Op.gte]: firstDayOfMonth
            }
          }
        });
        
        // Get upcoming deadlines (milestones and tasks)
        const nextTwoWeeks = new Date();
        nextTwoWeeks.setDate(nextTwoWeeks.getDate() + 14);
        
        const upcomingMilestones = await Milestone.findAll({
          attributes: ['title', 'dueDate', 'status', 'projectId'],
          where: {
            dueDate: {
              [Op.between]: [today, nextTwoWeeks]
            },
            status: {
              [Op.notIn]: ['Completed']
            }
          },
          include: [{
            model: Project,
            attributes: ['name']
          }],
          order: [['dueDate', 'ASC']],
          limit: 5
        });
        
        // Project progress data
        const activeProjects = await Project.findAll({
          attributes: ['id', 'name', 'status', 'startDate', 'endDate'],
          where: {
            status: 'In Progress'
          },
          limit: 4
        });
        
        const projectProgress = await Promise.all(activeProjects.map(async (project) => {
          // Calculate progress based on completed tasks
          const projectTasks = await Task.findAll({
            attributes: [
              [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
              [sequelize.fn('SUM', sequelize.literal('CASE WHEN status = "completed" THEN 1 ELSE 0 END')), 'completed'],
              [sequelize.fn('AVG', sequelize.col('progress')), 'avgProgress']
            ],
            where: {
              projectId: project.id
            },
            raw: true
          });
          
          // Calculate project status (On Track, At Risk, Delayed)
          let progress = 0;
          let status = 'On Track';
          
          if (projectTasks[0].total > 0) {
            progress = Math.round(projectTasks[0].avgProgress || 0);
            
            // Calculate if project is on track based on time elapsed vs progress
            if (project.startDate && project.endDate) {
              const totalDuration = new Date(project.endDate) - new Date(project.startDate);
              const elapsedDuration = new Date() - new Date(project.startDate);
              const timeProgressPercentage = (elapsedDuration / totalDuration) * 100;
              
              if (progress < timeProgressPercentage - 20) {
                status = 'Delayed';
              } else if (progress < timeProgressPercentage - 10) {
                status = 'At Risk';
              }
            }
          }
          
          return {
            name: project.name,
            progress: progress,
            status: status
          };
        }));
        
        // Format upcoming deadlines
        const upcomingDeadlines = upcomingMilestones.map(milestone => {
          const dueDate = new Date(milestone.dueDate);
          const today = new Date();
          const diffTime = Math.abs(dueDate - today);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          return {
            day: dueDate.getDate(),
            name: milestone.title,
            project: milestone.Project ? milestone.Project.name : 'Unknown Project',
            dueDate: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            daysLeft: diffDays,
            status: diffDays <= 3 ? 'critical' : diffDays <= 7 ? 'warning' : 'normal'
          };
        });
        
        // Format bug counts for the chart
        const formattedBugCounts = {
          bugsCritical: 0,
          bugsHigh: 0,
          bugsMedium: 0,
          bugsLow: 0
        };
        
        bugCounts.forEach(bug => {
          switch(bug.priority) {
            case 'critical':
              formattedBugCounts.bugsCritical = parseInt(bug.count);
              break;
            case 'high':
              formattedBugCounts.bugsHigh = parseInt(bug.count);
              break;
            case 'medium':
              formattedBugCounts.bugsMedium = parseInt(bug.count);
              break;
            case 'low':
              formattedBugCounts.bugsLow = parseInt(bug.count);
              break;
          }
        });
        
        // Combine all data
        const dashboardData = {
          projectData: {
            completedTasks: parseInt(taskCounts[0].completed) || 0,
            pendingTasks: parseInt(taskCounts[0].pending) || 0,
            totalProjects: parseInt(projectCounts[0].total) || 0,
            activeProjects: parseInt(projectCounts[0].active) || 0,
            teamMembers: teamMemberCount,
            taskCompletionRate: taskCompletionRate,
            upcomingDeadlines: upcomingDeadlines.length,
            projectsCompletedThisMonth: projectsCompletedThisMonth,
            newTeamMembers: newTeamMembers,
            ...formattedBugCounts
          },
          projectProgress: projectProgress,
          upcomingDeadlines: upcomingDeadlines
        };
        
        return res.status(200).json({ 
          success: true, 
          data: dashboardData 
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to retrieve dashboard data', 
          error: error.message 
        });
      }
    }
  };
  
  module.exports = dashboardController;