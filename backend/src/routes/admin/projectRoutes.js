// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectBugs,
    assignFreelancer,
} = require('../../controllers/admin/projectController');
const { authenticateUser } = require('../../middlewares/authenticate');
const { checkRole } = require('../../middlewares/authorize');

router.get('/', authenticateUser, checkRole(['admin', 'client', 'freelancer']), getAllProjects);
router.get('/:id', authenticateUser, checkRole(['admin', 'client', 'freelancer']), getProjectById);
router.post('/', authenticateUser, checkRole(['client,admin']), createProject);
router.put('/:id', authenticateUser, checkRole(['client', 'freelancer','admin']), updateProject);
router.delete('/:id', authenticateUser, checkRole(['client','admin']), deleteProject);
router.get('/:id/bugs', authenticateUser, checkRole(['admin', 'client', 'freelancer']), getProjectBugs);
router.put('/:id/assign-freelancer', authenticateUser, checkRole(['client','admin']), assignFreelancer);

module.exports = router;
