const jwt = require('jsonwebtoken');
require('dotenv').config();
const {User} = require('./../models');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const jwtService = {
  signToken: (payload, expiresIn = JWT_EXPIRES_IN) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null; 
    }
  },

  authenticate: async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const {id} = jwtService.verifyToken(token);
    if (!id) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    req.user = user; 
    next();
  }
};

module.exports = jwtService;
