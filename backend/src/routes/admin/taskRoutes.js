const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/admin/taskController');
const { authenticateUser } = require('../../middlewares/authenticate');
const { checkRole } = require('../../middlewares/authorize');
const {checkPermission}=require("../../middlewares/checkPermission")

router.get('/',authenticateUser, taskController.getAllTasks);
router.get('/:id',authenticateUser, taskController.getTaskById);
router.post('/',authenticateUser, taskController.createTask);
router.put('/:id', authenticateUser,taskController.updateTask);
router.delete('/:id',authenticateUser,checkRole(['admin','client','TeamLead']),checkPermission(['delete_tasks']), taskController.deleteTask);
router.patch('/:id/assign',authenticateUser,checkPermission('assign_tasks'), taskController.assignTask);
router.patch('/:id/status',authenticateUser,checkPermission('update_task_status'),taskController.updateTaskStatus);

module.exports = router;
