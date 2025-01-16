const { User, Role, Project, Bug } = require('../../models'); // Adjust the path based on your project structure
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const crypto = require("crypto")



// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Role, attributes: ['name'] }],
        });
        const newUsersMap = users.map(user => ({ ...user.toJSON(), role: user.Roles[0]?.name }));
        return res.status(200).json(newUsersMap);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { include: [Role] });


        const targetUser = await User.findByPk(req.params.id, {
            include: [{ model: Role, through: { attributes: [] } }],
        });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json(targetUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { include: [Role] });

        const { name, email, roleId } = req.body;


        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }
        let tempPassword = crypto.randomBytes(8).toString('hex')

        // Hash the password
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            status: 'active',
        });

        // Assign roles to the user
        if (roleId) {
            const roleInstances = await Role.findByPk(roleId);
            await newUser.setRoles(roleInstances);
        }

        return res.status(201).json({ message: 'User created successfully.', newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { include: [Role] });



        const targetUser = await User.findByPk(req.params.id);

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { name, email, password, status } = req.body;

        // Hash the password if it is provided
        if (password) {
            targetUser.password = await bcrypt.hash(password, 10);
        }

        targetUser.name = name || targetUser.name;
        targetUser.email = email || targetUser.email;
        targetUser.status = status || targetUser.status;
        await targetUser.save();

        return res.status(200).json({ message: 'User updated successfully.', targetUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { include: [Role] });



        const targetUser = await User.findByPk(req.params.id);
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        await targetUser.destroy();
        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Update user roles
const updateUserRole = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { include: [Role] });


        const { roles } = req.body;
        const targetUser = await User.findByPk(req.params.id);

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (roles && roles.length > 0) {
            const roleInstances = await Role.findAll({
                where: { id: { [Op.in]: roles } },
            });
            await targetUser.setRoles(roleInstances);
        }

        return res.status(200).json({ message: 'User roles updated successfully.', targetUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Get projects for a user
const getUserProjects = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { include: [Role] });



        const targetUser = await User.findByPk(req.params.id, {
            include: [
                { model: Project, as: 'ClientProjects' },
                { model: Project, as: 'FreelancerProjects' },
            ],
        });

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ targetUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Get bugs for a user
const getUserBugs = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { include: [Role] });



        const targetUser = await User.findByPk(req.params.id, {
            include: [
                { model: Bug, as: 'ReportedBugs' },
                { model: Bug, as: 'AssignedBugs' },
            ],
        });

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ targetUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

const getAllClients = async (req, res, next) => {
    console.log("getting here")
    try {
        const clients = await User.findAll({
            include: [{ model: Role, where: { name: 'client' }, attributes: ['name'] }]
        });

        console.log(clients)

        const newClients = clients.map((client) => { return { id: client.id, name: client.name, email: client.email, role: client.Roles[0].name } })

        return res.status(200).json({ success: true, message: "Successfully fetched all clients", data: newClients });
    } catch (error) {
        console.log(error);
        console.log(error);
        next(error);
    }
}

const getTeamOnlyMembers = async (req, res, next) => {
    try {
        const clients = await User.findAll({
            include: [{
                model: Role, where: {
                    name: { [Op.not]: 'client' }
                }, attributes: ['name']
            }]
        });

        console.log(clients)

        const newClients = clients.map((client) => { return { id: client.id, name: client.name, email: client.email, role: client.Roles[0].name } })

        return res.status(200).json({ success: true, message: "Successfully fetched all TeamMembers", data: newClients });
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole,
    getUserProjects,
    getUserBugs,
    getAllClients,
    getTeamOnlyMembers
};
