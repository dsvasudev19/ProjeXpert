const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role, RefreshToken,ForgotPasswordToken} = require('../models'); // Adjust the path based on your project structure
const { Op, where } = require('sequelize');
const crypto = require("crypto")
const {registrationSuccess,sendEmail} = require("../utils/nodeMailer")

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Fetch the 'client' role
        const clientRole = await Role.findOne({ where: { name: 'client' } });

        if (!clientRole) {
            return res.status(400).json({ message: 'Client role not found.' });
        }

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            status: 'active',
            lastLogin: new Date(),
        });

        // Associate the user with the 'client' role (many-to-many)
        await user.addRole(clientRole); // Sequelize will use the UserRoles join table automatically

        const verificationLink = `http://localhost:3000/verify-email?token=${user.id}`;
        const emailContent = registrationSuccess(user, verificationLink);

        const result = await sendEmail(user.email, 'Welcome to ProjectHub!', emailContent);

        
        return res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Log in a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email },include:[{model:Role}] });
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await RefreshToken.destroy({ where: { userId: user.id } });
        const refreshToken = await RefreshToken.create({
            userId: user.id,
            expiryDate: new Date(Date.now() + 30 * 60 * 1000),
            token: crypto.randomBytes(6).toString("hex").toUpperCase()
        });

        user.lastLogin = new Date();

        await user.save();

        res.cookie('token', token, { 
            sameSite: 'none',
            secure:true,
             maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken.token, { 
            sameSite: 'none',
            secure:true,
             maxAge: 60 * 60 * 1000 });
        return res.status(200).json({ message: 'Login successful.', token, user:{name:user.name,email:user.email,phone:user.phone,lastLogin:user.lastLogin,role:user.Roles[0].name}, refreshToken: refreshToken.token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Log out a user
const logout = (req, res) => {
    req.logout();
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logout successful.' });
}

const getUserByToken = async (req, res) => {
    try {
        // const token = req.headers.authorization?.split(' ')[1];
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided. --> From getUserByToken' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
            include: [{
                model: Role,
                attributes: ['name'],
                exclude: ['UserRole']

            }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error in getUserByToken:', error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        }
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const generateAccessTokenBasedOnRefreshToken = async (req, res, next) => {
    try {
        const { token } = req.query;
        console.log(req.params)
        if (!token) {
            return res.status(401).json({ success: false, message: "No Refresh Token found" })
        }
        const tokenFromDatabase = await RefreshToken.findOne({
            where: {
                token
            }
        })
        if (tokenFromDatabase.expiryDate > new Date()) {
            const accessToken = jwt.sign({ id: tokenFromDatabase.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ success: true, message: "Successfully generated new AccessToken", token: accessToken })
        }
        return res.status(401).json({ success: false, message: "Refresh Token expired Please login again." })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


const generateForgotPasswordToken = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const forgotPasswordToken = crypto.randomBytes(16).toString('hex');
        const forgotPasswordTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await ForgotPasswordToken.create({
            userId: user.id,
            token: forgotPasswordToken,
            expiryDate: forgotPasswordTokenExpiry
        });
        return res.status(200).json({ message: 'Forgot password token generated successfully.', token: forgotPasswordToken });
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { email,password } = req.body;
        const { token } = req.query;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const forgotPasswordToken = await ForgotPasswordToken.findOne({ where: { token } });
        if (!forgotPasswordToken || forgotPasswordToken.expiryDate < new Date()) {
            return res.status(404).json({ message: 'Forgot password token not found.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        await ForgotPasswordToken.destroy({ where: { userId: user.id } });
        return res.status(200).json({ message: 'Password reset successfully.' });
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}


const getUserForResetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const forgotPasswordToken = await ForgotPasswordToken.findOne({ where: { token } });
        if (!forgotPasswordToken || forgotPasswordToken.expiryDate < new Date()) {
            return res.status(404).json({ message: 'Forgot password token not found.' });
        }
        const user = await User.findByPk(forgotPasswordToken.userId);
        if(!user){
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json({success:true,message:"User found successfully",user});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = {
    register,
    login,
    logout,
    getUserByToken,
    generateAccessTokenBasedOnRefreshToken,
    generateForgotPasswordToken,
    resetPassword,
    getUserForResetPassword
}