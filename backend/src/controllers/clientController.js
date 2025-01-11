const { User, Role, Project, Bug } = require('./../models'); // Adjust the path based on your project structure
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');



// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            status: 'active',
        });

        // Assign roles to the user
        if (roles && roles.length > 0) {
            const roleInstances = await Role.findAll({
                where: { id: { [Op.in]: roles } },
            });
            await user.setRoles(roleInstances);
        }

        return res.status(201).json({ message: 'User created successfully.', user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Update a user
const updateUser = async (req, res) => {
    try {
        const { name, email, password, status } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the password if it is provided
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.status = status || user.status;
        await user.save();

        return res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Update user roles

// Get projects for a user
const getUserProjects = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { model: Project, as: 'ClientProjects' },
                { model: Project, as: 'FreelancerProjects' },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Get bugs for a user
const getUserBugs = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { model: Bug, as: 'ReportedBugs' },
                { model: Bug, as: 'AssignedBugs' },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

module.exports = {
    createUser,
    updateUser,
    getUserProjects,
    getUserBugs
};
