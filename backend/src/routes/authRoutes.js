const express = require('express');
const router = express.Router();
const { register, login, logout, getUserByToken, generateAccessTokenBasedOnRefreshToken, githubAuth, githubCallback } = require('../controllers/authController');
const passport = require('passport');

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// User logout route
router.post('/logout', logout);

router.get("/user/token",getUserByToken);

router.post("/refresh-token",generateAccessTokenBasedOnRefreshToken)

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', githubCallback);

module.exports = router;
