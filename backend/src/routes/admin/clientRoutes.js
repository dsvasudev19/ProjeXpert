const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/clientController'); // Adjust the path based on your project structure
const { authenticateUser } = require('../../middlewares/authenticate');
const { checkRole } = require('../../middlewares/authorize');

// Routes for user management
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get user by ID
router.post('/',  userController.createUser); // Create a new user
router.put('/:id',  userController.updateUser); // Update a user
router.delete('/:id',  userController.deleteUser); // Delete a user

// Route to update user roles
router.put('/:id/roles',  userController.updateUserRole); // Update user roles

// Routes to get projects and bugs for a user
router.get('/:id/projects', userController.getUserProjects); // Get projects for a user
router.get('/:id/bugs',  userController.getUserBugs); // Get bugs for a user

module.exports = router;
