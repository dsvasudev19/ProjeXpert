const { User, Bug, Task, Project } = require('./../../models');
const { Op } = require('sequelize');

class KanbanController {
  // Get all tasks/bugs for kanban view based on current user
  async getKanbanItems(req, res) {
    try {
      const { itemType = 'both' } = req.query;
      const userId = req.user.id;
      
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }

      // Initialize kanban columns
      const kanbanData = {
        TO_DO: { title: 'To Do', items: [] },
        IN_PROGRESS: { title: 'In Progress', items: [] },
        REVIEW: { title: 'Review', items: [] },
        BLOCKED: { title: 'Blocked', items: [] },
        DONE: { title: 'Done', items: [] }
      };

      // Fetch tasks if requested
      if (itemType === 'tasks' || itemType === 'both') {
        const tasks = await Task.findAll({
          where: { assigneeId: userId },
          include: [
            {
              model: User,
              as: 'Assignee',
              attributes: ['id', 'name', 'avatar']
            },
            {
              model: Project,
              attributes: ['id', 'name']
            }
          ]
        });

        // Map task status to kanban columns
        tasks.forEach(task => {
          const taskItem = {
            id: `task-${task.id}`,
            refId: task.refId,
            title: task.title,
            description: task.description,
            status: this.mapTaskStatusToKanban(task.status),
            priority: task.priority,
            dueDate: task.dueDate,
            assignee: task.Assignee,
            project: task.Project,
            type: 'task',
            progress: task.progress,
            tags: task.tags ? task.tags.split(',') : []
          };

          if (kanbanData[taskItem.status]) {
            kanbanData[taskItem.status].items.push(taskItem);
          } else {
            kanbanData.TO_DO.items.push(taskItem);
          }
        });
      }

      // Fetch bugs if requested
      if (itemType === 'bugs' || itemType === 'both') {
        const bugs = await Bug.findAll({
          where: { assigneeId: userId },
          include: [
            {
              model: User,
              as: 'Assignee',
              attributes: ['id', 'name', 'avatar']
            },
            {
              model: User,
              as: 'Reporter',
              attributes: ['id', 'name', 'avatar']
            },
            {
              model: Project,
              attributes: ['id', 'name']
            }
          ]
        });

        // Map bug status to kanban columns
        bugs.forEach(bug => {
          const bugItem = {
            id: `bug-${bug.id}`,
            title: bug.title,
            description: bug.description,
            status: this.mapBugStatusToKanban(bug.status),
            priority: bug.priority,
            dueDate: bug.dueDate,
            assignee: bug.Assignee,
            reporter: bug.Reporter,
            project: bug.Project,
            type: 'bug',
            tags: bug.tags ? bug.tags.split(',') : []
          };

          if (kanbanData[bugItem.status]) {
            kanbanData[bugItem.status].items.push(bugItem);
          } else {
            kanbanData.TO_DO.items.push(bugItem);
          }
        });
      }

      return res.status(200).json(kanbanData);
    } catch (error) {
      console.error('Error fetching kanban data:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // Update item status (for drag and drop functionality)
  async updateItemStatus(req, res) {
    try {
      const { itemId, newStatus } = req.body;
      const userId = req.user.id;
      console.log(newStatus+"new ")
      if (!itemId || !newStatus) {
        return res.status(400).json({ message: 'Item ID and new status are required' });
      }

      // Determine if it's a task or bug
      const [itemType, id] = itemId.split('-');
      
      if (itemType === 'task') {
        const task = await Task.findOne({ 
          where: { 
            id: id,
            assigneeId: userId 
          }
        });
        
        if (!task) {
          return res.status(404).json({ message: 'Task not found or not assigned to you' });
        }
        
        const taskStatus = this.mapKanbanStatusToTask(newStatus);
        await task.update({ status: taskStatus });
        
        return res.status(200).json({ message: 'Task status updated successfully', task });
      } else if (itemType === 'bug') {
        const bug = await Bug.findOne({ 
          where: { 
            id: id,
            assigneeId: userId 
          }
        });
        
        if (!bug) {
          return res.status(404).json({ message: 'Bug not found or not assigned to you' });
        }
        
        const bugStatus = this.mapKanbanStatusToBug(newStatus);
        await bug.update({ status: bugStatus });
        
        return res.status(200).json({ message: 'Bug status updated successfully', bug });
      } else {
        return res.status(400).json({ message: 'Invalid item type' });
      }
    } catch (error) {
      console.error('Error updating item status:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // Create new task directly from kanban
  async createKanbanTask(req, res) {
    try {
      const { projectId, title, description, priority, dueDate, tags } = req.body;
      const userId = req.user.id;
      
      if (!projectId || !title) {
        return res.status(400).json({ message: 'Project ID and title are required' });
      }

      // Check if project exists
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Generate a unique reference ID
      const refId = `T-${Date.now().toString().slice(-6)}`;
      
      const newTask = await Task.create({
        refId,
        title,
        description: description || '',
        status: 'to-do', // Default status for new tasks
        priority: priority || 'medium',
        dueDate: dueDate || null,
        assigneeId: userId, // Assign to current user
        projectId,
        tags: tags ? tags.join(',') : '',
        progress: 0,
        createdBy: userId
      });

      const taskWithAssignee = await Task.findByPk(newTask.id, {
        include: [
          {
            model: User,
            as: 'Assignee',
            attributes: ['id', 'name', 'avatar']
          },
          {
            model: Project,
            attributes: ['id', 'name']
          }
        ]
      });

      return res.status(201).json({
        message: 'Task created successfully',
        task: {
          id: `task-${taskWithAssignee.id}`,
          refId: taskWithAssignee.refId,
          title: taskWithAssignee.title,
          description: taskWithAssignee.description,
          status: this.mapTaskStatusToKanban(taskWithAssignee.status),
          priority: taskWithAssignee.priority,
          dueDate: taskWithAssignee.dueDate,
          assignee: taskWithAssignee.Assignee,
          project: taskWithAssignee.Project,
          type: 'task',
          progress: taskWithAssignee.progress,
          tags: taskWithAssignee.tags ? taskWithAssignee.tags.split(',') : []
        }
      });
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // Update an item's details
//   async updateKanbanItem(req, res) {
//     try {
//       const { itemId } = req.params;
//       const { title, description, priority, dueDate, tags } = req.body;
//       const userId = req.user.id;
      
//       if (!itemId) {
//         return res.status(400).json({ message: 'Item ID is required' });
//       }

//       // Determine if it's a task or bug
//       const [itemType, id] = itemId.split('-');
      
//       if (itemType === 'task') {
//         const task = await Task.findOne({
//           where: {
//             id: id,
//             assigneeId: userId
//           }
//         });
        
//         if (!task) {
//           return res.status(404).json({ message: 'Task not found or not assigned to you' });
//         }
        
//         await task.update({
//           title: title || task.title,
//           description: description || task.description,
//           priority: priority || task.priority,
//           dueDate: dueDate || task.dueDate,
//           tags: tags ? tags.join(',') : task.tags
//         });
        
//         const updatedTask = await Task.findByPk(id, {
//           include: [
//             {
//               model: User,
//               as: 'Assignee',
//               attributes: ['id', 'name', 'avatar']
//             },
//             {
//               model: Project,
//               attributes: ['id', 'name']
//             }
//           ]
//         });
        
//         return res.status(200).json({ 
//           message: 'Task updated successfully',
//           task: {
//             id: `task-${updatedTask.id}`,
//             refId: updatedTask.refId,
//             title: updatedTask.title,
//             description: updatedTask.description,
//             status: this.mapTaskStatusToKanban(updatedTask.status),
//             priority: updatedTask.priority,
//             dueDate: updatedTask.dueDate,
//             assignee: updatedTask.Assignee,
//             project: updatedTask.Project,
//             type: 'task',
//             progress: updatedTask.progress,
//             tags: updatedTask.tags ? updatedTask.tags.split(',') : []
//           }
//         });
//       } else if (itemType === 'bug') {
//         const bug = await Bug.findOne({
//           where: {
//             id: id,
//             assigneeId: userId
//           }
//         });
        
//         if (!bug) {
//           return res.status(404).json({ message: 'Bug not found or not assigned to you' });
//         }
        
//         await bug.update({
//           title: title || bug.title,
//           description: description || bug.description,
//           priority: priority || bug.priority,
//           dueDate: dueDate || bug.dueDate,
//           tags: tags ? tags.join(',') : bug.tags
//         });
        
//         const updatedBug = await Bug.findByPk(id, {
//           include: [
//             {
//               model: User,
//               as: 'Assignee',
//               attributes: ['id', 'name', 'avatar']
//             },
//             {
//               model: User,
//               as: 'Reporter',
//               attributes: ['id', 'name', 'avatar']
//             },
//             {
//               model: Project,
//               attributes: ['id', 'name']
//             }
//           ]
//         });
        
//         return res.status(200).json({ 
//           message: 'Bug updated successfully',
//           bug: {
//             id: `bug-${updatedBug.id}`,
//             title: updatedBug.title,
//             description: updatedBug.description,
//             status: this.mapBugStatusToKanban(updatedBug.status),
//             priority: updatedBug.priority,
//             dueDate: updatedBug.dueDate,
//             assignee: updatedBug.Assignee,
//             reporter: updatedBug.Reporter,
//             project: updatedBug.Project,
//             type: 'bug',
//             tags: updatedBug.tags ? updatedBug.tags.split(',') : []
//           }
//         });
//       } else {
//         return res.status(400).json({ message: 'Invalid item type' });
//       }
//     } catch (error) {
//       console.error('Error updating item:', error);
//       return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
//   }

async updateKanbanItem(req, res) {
    try {
      const { itemId } = req.params;
      const { title, description, priority, dueDate, tags, status, progress } = req.body; // Add status and progress
      const userId = req.user.id;
  
      if (!itemId) {
        return res.status(400).json({ message: 'Item ID is required' });
      }
  
      const [itemType, id] = itemId.split('-');
  
      if (itemType === 'task') {
        const task = await Task.findOne({
          where: {
            id: id,
            assigneeId: userId
          }
        });
  
        if (!task) {
          return res.status(404).json({ message: 'Task not found or not assigned to you' });
        }
  
        // Map status if provided
        const mappedStatus = status ? this.mapKanbanStatusToTask(status) : task.status;
  
        await task.update({
          title: title || task.title,
          description: description || task.description,
          priority: priority || task.priority,
          dueDate: dueDate || task.dueDate,
          tags: tags ? tags.join(',') : task.tags,
          status: mappedStatus, // Update status
          progress: progress !== undefined ? progress : task.progress // Update progress if provided
        });
  
        const updatedTask = await Task.findByPk(id, {
          include: [
            {
              model: User,
              as: 'Assignee',
              attributes: ['id', 'name', 'avatar']
            },
            {
              model: Project,
              attributes: ['id', 'name']
            }
          ]
        });
  
        return res.status(200).json({
          message: 'Task updated successfully',
          task: {
            id: `task-${updatedTask.id}`,
            refId: updatedTask.refId,
            title: updatedTask.title,
            description: updatedTask.description,
            status: this.mapTaskStatusToKanban(updatedTask.status),
            priority: updatedTask.priority,
            dueDate: updatedTask.dueDate,
            assignee: updatedTask.Assignee,
            project: updatedTask.Project,
            type: 'task',
            progress: updatedTask.progress,
            tags: updatedTask.tags ? updatedTask.tags.split(',') : []
          }
        });
      } else if (itemType === 'bug') {
        const bug = await Bug.findOne({
          where: {
            id: id,
            assigneeId: userId
          }
        });
  
        if (!bug) {
          return res.status(404).json({ message: 'Bug not found or not assigned to you' });
        }
  
        // Map status if provided
        const mappedStatus = status ? this.mapKanbanStatusToBug(status) : bug.status;
  
        await bug.update({
          title: title || bug.title,
          description: description || bug.description,
          priority: priority || bug.priority,
          dueDate: dueDate || bug.dueDate,
          tags: tags ? tags.join(',') : bug.tags,
          status: mappedStatus // Update status
          // Note: Progress isn't applicable to bugs in this schema
        });
  
        const updatedBug = await Bug.findByPk(id, {
          include: [
            {
              model: User,
              as: 'Assignee',
              attributes: ['id', 'name', 'avatar']
            },
            {
              model: User,
              as: 'Reporter',
              attributes: ['id', 'name', 'avatar']
            },
            {
              model: Project,
              attributes: ['id', 'name']
            }
          ]
        });
  
        return res.status(200).json({
          message: 'Bug updated successfully',
          bug: {
            id: `bug-${updatedBug.id}`,
            title: updatedBug.title,
            description: updatedBug.description,
            status: this.mapBugStatusToKanban(updatedBug.status),
            priority: updatedBug.priority,
            dueDate: updatedBug.dueDate,
            assignee: updatedBug.Assignee,
            reporter: updatedBug.Reporter,
            project: updatedBug.Project,
            type: 'bug',
            tags: updatedBug.tags ? updatedBug.tags.split(',') : []
          }
        });
      } else {
        return res.status(400).json({ message: 'Invalid item type' });
      }
    } catch (error) {
      console.error('Error updating item:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // Helper methods for status mapping between kanban and database models
  mapTaskStatusToKanban(taskStatus) {
    const statusMap = {
      'to-do': 'TO_DO',
      'in-progress': 'IN_PROGRESS',
      'review': 'REVIEW',
      'blocked': 'BLOCKED',
      'done': 'DONE'
    };
    
    return statusMap[taskStatus] || 'TO_DO';
  }

  mapKanbanStatusToTask(kanbanStatus) {
    const statusMap = {
      'TO_DO': 'to-do',
      'IN_PROGRESS': 'in-progress',
      'REVIEW': 'review',
      'BLOCKED': 'blocked',
      'DONE': 'done'
    };
    
    return statusMap[kanbanStatus] || 'to-do';
  }

  mapBugStatusToKanban(bugStatus) {
    const statusMap = {
      'open': 'TO_DO',
      'in-progress': 'IN_PROGRESS',
      'resolved': 'REVIEW',
      'reopened': 'BLOCKED',
      'closed': 'DONE'
    };
    
    return statusMap[bugStatus] || 'TO_DO';
  }

  mapKanbanStatusToBug(kanbanStatus) {
    const statusMap = {
      'TO_DO': 'open',
      'IN_PROGRESS': 'in-progress',
      'REVIEW': 'resolved',
      'BLOCKED': 'reopened',
      'DONE': 'closed'
    };
    
    return statusMap[kanbanStatus] || 'open';
  }
}

module.exports = new KanbanController();