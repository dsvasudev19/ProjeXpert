const express = require('express');
const router = express.Router();
const { register, login, logout ,getUserByToken,generateAccessTokenBasedOnRefreshToken} = require('../controllers/authController');

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// User logout route
router.post('/logout', logout);

router.get("/user/token",getUserByToken);

router.post("/refresh-token",generateAccessTokenBasedOnRefreshToken)

module.exports = router;
