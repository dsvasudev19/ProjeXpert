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
} = require('../../controllers/admin/projectController');
const { authenticateUser } = require('../../middlewares/authenticate');
const { checkRole } = require('../../middlewares/authorize');
const {checkPermission}=require("../../middlewares/checkPermission")

router.get('/', authenticateUser, checkRole(['admin', 'client', 'freelancer','teamlead']),checkPermission(['view_projects']), getAllProjects);
router.get('/:id', authenticateUser, checkRole(['admin', 'client', 'freelancer']),checkPermission(['view_projects']), getProjectById);
router.post('/', authenticateUser, checkRole(['client','admin']), checkPermission(['create_projects']), createProject);
router.put('/:id', authenticateUser, checkRole(['client', 'freelancer','admin']),checkPermission(['update_projects']),  updateProject);
router.delete('/:id', authenticateUser, checkRole(['client','admin']), checkPermission(['delete_projects']), deleteProject);
router.get('/:id/bugs', authenticateUser, checkRole(['admin', 'client', 'freelancer']),checkPermission(['view_projects']),  getProjectBugs);
// router.put('/:id/assign-freelancer', authenticateUser, checkRole(['client','admin']),checkPermission(['update_projects']), assignFreelancer);

module.exports = router;
