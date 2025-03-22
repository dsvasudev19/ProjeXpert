const express = require('express');
const router = express.Router();
const kanbanController = require('../../controllers/admin/kanbanController');
const {authenticateUser} = require('./../../middlewares/authenticate');

// Apply authentication middleware to all kanban routes
router.use(authenticateUser);

// Get all kanban items (tasks/bugs) for the current user
router.get('/', kanbanController.getKanbanItems.bind(kanbanController));

// Update item status (for drag and drop)
router.put('/status', kanbanController.updateItemStatus.bind(kanbanController));

// Create new task directly from kanban
router.post('/task', kanbanController.createKanbanTask.bind(kanbanController));

// Update item details
router.put('/:itemId', kanbanController.updateKanbanItem.bind(kanbanController));

module.exports = router;