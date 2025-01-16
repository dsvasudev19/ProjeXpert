const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove, addMember, removeMember,getTeamMembers } = require('../../controllers/admin/teamController');

// Get all teams
router.get('/', getAll);

// Get a single team by ID
router.get('/:id', getById);

router.get("/members/:id",getTeamMembers)

// Create a new team
router.post('/', create);

// Update an existing team by ID
router.put('/:id', update);

// Delete a team by ID
router.delete('/:id', remove);

// Add a member to a team
router.post('/member', addMember);

// Remove a member from a team
router.delete('/:teamId/member/:userId', removeMember);

module.exports = router;
