const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwtService = require("./../services/jwtService")
const {
    register,
    login,
    logout,
    getUserByToken,
    generateAccessTokenBasedOnRefreshToken,
    generateForgotPasswordToken,
    resetPassword,
    getUserForResetPassword
} = require('../controllers/authController');

const { RefreshToken } = require("./../models")
const crypto = require('crypto');

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// User logout route
router.post('/logout', logout);

router.get("/user/token", getUserByToken);

router.post("/refresh-token", generateAccessTokenBasedOnRefreshToken)

router.post("/forgot-password", generateForgotPasswordToken)

router.post("/reset-password", resetPassword)

router.get("/reset-password", getUserForResetPassword)




router.get('/github',
    passport.authenticate('github', {
        scope: ['user:email'],
        session: false
    })
);

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: `${process.env.FRONTEND_URL}/login?error=github_auth_failed`,
        session: false
    }),
    async (req, res) => {
        try {
            console.log("req.user", req.user)
            const token = jwtService.signToken({id:req.user.id});

            await RefreshToken.destroy({ where: { userId: req.user.id } });
            const refreshToken = await RefreshToken.create({
                userId: req.user.id,
                expiryDate: new Date(Date.now() + 30 * 60 * 1000),
                token: crypto.randomBytes(6).toString("hex").toUpperCase()
            });

            res.cookie('token', token, {
                maxAge: 30 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure:true,
            });

            res.cookie('refreshToken', refreshToken.token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure:true,
            });

            res.redirect(`${process.env.FRONTEND_URL}/dashboard/analytics`);
        } catch (error) {
            console.error('GitHub callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=github_auth_failed`);
        }
    }
);



module.exports = router;
