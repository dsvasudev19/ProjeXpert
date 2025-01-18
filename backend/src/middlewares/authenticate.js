// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateUser = async (req, res, next) => {
    // const token = req.header('Authorization')?.replace('Bearer ', '');
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found.' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};

module.exports = { authenticateUser };
