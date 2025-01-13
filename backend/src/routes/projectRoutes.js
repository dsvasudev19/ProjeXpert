const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    getProjectBugs,
    assignFreelancer
} = require('../controllers/projectController');
const { authenticateUser } = require('../middlewares/authenticate');
const { checkRole } = require('../middlewares/authorize');

// Route to get all projects (Admin has access to all, others can only see their own)
router.get('/', authenticateUser, getAllProjects);

// Route to get a project by ID (Admin has access to all, others can only access their own projects)
router.get('/:id', authenticateUser, getProjectById);

// Route to create a new project (Admins only)
router.post('/', authenticateUser, checkRole('admin'), createProject);

// Route to update a project (Admins only)
router.put('/:id', authenticateUser, checkRole('admin'), updateProject);

// Route to get bugs for a project (Admin has access to all, others can only see their own)
router.get('/:id/bugs', authenticateUser, getProjectBugs);

// Route to assign a freelancer to a project (Admins only)
// router.put('/:id/assign-freelancer', authenticateUser, checkRole('admin'), assignFreelancer);

module.exports = router;
