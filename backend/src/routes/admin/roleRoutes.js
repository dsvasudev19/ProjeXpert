// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/admin/roleController');
const { authenticateUser } = require('../../middlewares/authenticate');
const { checkRole } = require('../../middlewares/authorize');

// router.post('/roles', authenticateUser, checkRole(['ADMIN']), roleController.createRole);
router.post('/', roleController.createRole);
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.post('/assign-permissions', roleController.assignPermissionsToRole);

module.exports = router;
