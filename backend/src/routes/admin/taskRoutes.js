const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/admin/taskController');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/assign', taskController.assignTask);
router.patch('/:id/status', taskController.updateTaskStatus);

module.exports = router;
