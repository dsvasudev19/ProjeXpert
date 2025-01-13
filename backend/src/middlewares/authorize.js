// middleware/checkRole.js
const { User, Role } = require('../models');

const checkRole = (requiredRoles) => async (req, res, next) => {
    try {
        // Get the userId from the authenticated user
        const userId = req.user.id;

        // Find the user along with their roles
        const user = await User.findByPk(userId, {
            include: {
                model: Role,
                attributes: ['name']
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Get all roles associated with the user
        const userRoles = new Set(user.Roles.map(role => role.name));

        // console.log('Required roles:', requiredRoles)
        // console.log('User roles:', userRoles)

        // Check if any of the required roles exist in the user's roles
        const hasRole = requiredRoles.some(role => userRoles.has(role));

        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role.' });
        }

        // Proceed if the user has at least one of the required roles
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

module.exports = { checkRole };
