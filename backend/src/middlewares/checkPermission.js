// middleware/checkRole.js
const { User, Role, Permission } = require('../models');

const checkPermission = (requiredPermissions) => async (req, res, next) => {
    try {
        // Get the userId from the authenticated user
        const userId = req.user.id;

        // Find the user along with their roles and the permissions of those roles
        const user = await User.findByPk(userId, {
            include: {
                model: Role,
                include: {
                    model: Permission, // Include permissions of the role
                    attributes: ['name'] // Get only the name of permissions
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Get all permissions associated with the user's roles
        const userPermissions = new Set();
        user.Roles.forEach(role => {
            role.Permissions.forEach(permission => {
                userPermissions.add(permission.name); // Add permission name to the set
            });
        });
        console.log('creating  project')
        console.log(requiredPermissions)
        console.log(userPermissions)

        // Check if any of the required permissions exist in the user's permissions
        const hasPermission = requiredPermissions.some(permission => userPermissions.has(permission));

        if (!hasPermission) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
        }

        // Proceed if the user has at least one of the required permissions
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

module.exports = { checkPermission };
