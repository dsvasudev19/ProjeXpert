const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role, RefreshToken } = require('../models'); // Adjust the path based on your project structure
const { Op, where } = require('sequelize');
const crypto = require("crypto")
const {registrationSuccess,sendEmail} = require("../utils/nodeMailer")
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

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
        const user = await User.findOne({ where: { email } });
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

        res.cookie('token', token, { httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production', maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken.token, { httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000 });
        return res.status(200).json({ message: 'Login successful.', token, user:{name:user.name,email:user.email,phone:user.phone,lastLogin:user.lastLogin}, refreshToken: refreshToken.token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Log out a user
const logout = (req, res) => {

    return res.status(200).json({ message: 'Logout successful.' });
}

const getUserByToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided.' });
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

// Configure GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/github/callback",
    scope: ['user:email']  // Add this line to request email access
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      console.log("GitHub profile:", profile); // For debugging
      
      // Find or create user
      let user = await User.findOne({ 
        where: { 
          githubId: profile.id 
        }
      });

      if (!user) {
        // Get primary email from GitHub profile
        const primaryEmail = profile.emails?.find(email => email.primary)?.value 
          || profile.emails?.[0]?.value;
        
        if (!primaryEmail) {
          console.error('No email found in GitHub profile:', profile);
          return done(new Error('No email found in GitHub profile. Please ensure your GitHub email is public or grant email access.'));
        }

        // Check if user exists with this email
        user = await User.findOne({ where: { email: primaryEmail } });

        if (user) {
          // Update existing user with GitHub ID
          user.githubId = profile.id;
          await user.save();
        } else {
          // Create new user
          const clientRole = await Role.findOne({ where: { name: 'client' } });
          
          if (!clientRole) {
            return done(new Error('Client role not found'));
          }

          user = await User.create({
            name: profile.displayName || profile.username,
            email: primaryEmail,
            githubId: profile.id,
            status: 'active',
            lastLogin: new Date()
          });

          await user.addRole(clientRole);
        }
      }

      return done(null, user);
    } catch (error) {
      console.error('GitHub strategy error:', error);
      return done(error);
    }
  }
));

// GitHub callback handler
const githubCallback = async (req, res, next) => {
  passport.authenticate('github', async (err, user) => {
    try {
      if (err) {
        console.error('GitHub auth error:', err);
        return res.redirect(`${process.env.FRONTEND_URL}/auth/login?error=${encodeURIComponent(err.message)}`);
      }
      
      if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/auth/login?error=GitHub authentication failed`);
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Create refresh token
      await RefreshToken.destroy({ where: { userId: user.id } });
      const refreshToken = await RefreshToken.create({
        userId: user.id,
        expiryDate: new Date(Date.now() + 30 * 60 * 1000),
        token: crypto.randomBytes(6).toString("hex").toUpperCase()
      });

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Set cookies
      res.cookie('token', token, { 
        httpOnly: process.env.NODE_ENV === 'production', 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 15 * 60 * 1000,  // 15 minutes
        sameSite: 'lax'
      });
      
      res.cookie('refreshToken', refreshToken.token, { 
        httpOnly: process.env.NODE_ENV === 'production', 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 30 * 60 * 1000,  // 30 minutes
        sameSite: 'lax'
      });

      // Redirect to frontend with tokens in URL parameters
      const redirectUrl = new URL(`${process.env.FRONTEND_URL}/auth/github/callback`);
      redirectUrl.searchParams.append('token', token);
      redirectUrl.searchParams.append('refreshToken', refreshToken.token);
      
      // Include basic user info in the redirect
      const userInfo = {
        name: user.name,
        email: user.email,
        lastLogin: user.lastLogin
      };
      redirectUrl.searchParams.append('user', encodeURIComponent(JSON.stringify(userInfo)));
      
      res.redirect(redirectUrl.toString());
    } catch (error) {
      console.error('GitHub callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/auth/login?error=Server error`);
    }
  })(req, res, next);
};

module.exports = {
    register,
    login,
    logout,
    getUserByToken,
    generateAccessTokenBasedOnRefreshToken,
    githubCallback
}
