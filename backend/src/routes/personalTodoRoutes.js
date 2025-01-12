const express = require('express');
const router = express.Router();
const personalTodoController = require('../controllers/personalTodoController');

const { authenticateUser } = require("./../middlewares/authenticate")

// Get all todos for the authenticated user
router.get('/', authenticateUser, personalTodoController.getAllTodos);

// Create a new todo
router.post('/', authenticateUser, personalTodoController.createTodo);

// Update a todo
router.put('/:id', authenticateUser, personalTodoController.updateTodo);

// Delete a todo
router.delete('/:id', authenticateUser, personalTodoController.deleteTodo);

// Get todos by status
router.get('/status/:status', authenticateUser, personalTodoController.getTodosByStatus);

// Get todos by priority
router.get('/priority/:priority', authenticateUser, personalTodoController.getTodosByPriority);

// Mark a todo as complete
router.patch('/:id/change-status', authenticateUser, personalTodoController.changeStatus);

// Create a repetitive todo
router.post('/repeat', authenticateUser, personalTodoController.createRepetitiveTodo);

module.exports = router;
