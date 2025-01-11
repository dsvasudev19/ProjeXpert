const express = require('express');
const router = express.Router();
const { getAllBugs, getBugById, createBug, updateBug, deleteBug } = require('../../controllers/admin/bugController');
const { authenticateUser } = require('../../middlewares/authenticate');
const { checkRole } = require("../../middlewares/authorize")

router.get('/', authenticateUser, checkRole(['admin', 'client', 'freelancer']), getAllBugs);
router.get('/:id', authenticateUser, checkRole(['admin', 'client', 'freelancer']), getBugById);
router.post('/', authenticateUser, checkRole(['admin', 'client', 'freelancer']), createBug);
router.put('/:id', authenticateUser, checkRole(['admin', 'client', 'freelancer']), updateBug);
router.delete('/:id', authenticateUser, checkRole(['admin', 'client', 'freelancer']), deleteBug);

module.exports = router;
