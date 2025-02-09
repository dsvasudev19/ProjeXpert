const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/clientController'); // Adjust the path based on your project structure
const { authenticateUser } = require('../../middlewares/authenticate');
const { checkRole } = require('../../middlewares/authorize');

// Routes for user management
router.get('/',authenticateUser, userController.getAllUsers); // Get all users
router.get('/:id',authenticateUser, userController.getUserById); // Get user by ID

router.post('/',authenticateUser,  userController.createUser); // Create a new user
router.put('/:id',authenticateUser,  userController.updateUser); // Update a user
router.delete('/:id',authenticateUser,  userController.deleteUser); // Delete a user

// Route to update user roles
router.put('/:id/roles', authenticateUser, userController.updateUserRole); // Update user roles

// Routes to get projects and bugs for a user
router.get('/:id/projects', authenticateUser,userController.getUserProjects); // Get projects for a user
router.get('/:id/bugs', authenticateUser, userController.getUserBugs); // Get bugs for a user

router.get("/users/clients",authenticateUser,userController.getAllClients)

router.get("/team/internal-only",authenticateUser,userController.getTeamOnlyMembers)

router.get("/team/admins",authenticateUser,userController.getAllAdmins)

module.exports = router;
