const express = require('express');
const router = express.Router();
const { register, login, logout ,getUserByToken} = require('../../controllers/admin/authController'); 
const { authenticateUser } = require('../../middlewares/authenticate');

router.post('/register', register); 

router.post('/login', login); 

router.post('/logout', authenticateUser, logout);

router.get("/user/token",getUserByToken);

module.exports = router;
    