const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// User logout route
router.post('/logout', logout);

module.exports = router;
