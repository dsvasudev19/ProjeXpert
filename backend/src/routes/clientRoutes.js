const express = require('express');
const router = express.Router();
const {
    createUser,
    updateUser,
    getUserProjects,
    getUserBugs
} = require('../controllers/clientController');

// Route to create a new user
router.post('/', createUser);

// Route to update an existing user
router.put('/:id', updateUser);

// Route to get projects for a user
router.get('/:id/projects', getUserProjects);

// Route to get bugs for a user
router.get('/:id/bugs', getUserBugs);

module.exports = router;
