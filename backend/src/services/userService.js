const { User, Role, Project, Bug } = require('../../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const crypto = require("crypto");
const { sendEmail } = require("./../../utils/nodeMailer");
const { registrationSuccess } = require("./../../helpers/emailTemplates");

const userService = {
    getAllUsers: async () => {
        const users = await User.findAll({
            include: [{ model: Role, attributes: ['name'] }],
        });
        return users.map(user => ({ ...user.toJSON(), role: user.Roles[0]?.name }));
    },

    getUserById: async (userId) => {
        return await User.findByPk(userId, { include: [Role] });
    },

    createUser: async (userData) => {
        const { name, email, roleId } = userData;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use.');
        }
        let tempPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            status: 'active',
        });

        if (roleId) {
            const roleInstances = await Role.findByPk(roleId);
            await newUser.setRoles(roleInstances);
        }

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${newUser.id}`;
        const emailData = {
            to: newUser.email,
            subject: "Welcome to Projexpert!",
            html: registrationSuccess({ ...newUser, verificationLink, tempPassword })
        };
        await sendEmail(emailData.to, emailData.subject, emailData.html);

        return newUser;
    },

    updateUser: async (userId, userData) => {
        const targetUser = await User.findByPk(userId);
        if (!targetUser) {
            throw new Error('User not found.');
        }

        const { name, email, password, status } = userData;

        if (password) {
            targetUser.password = await bcrypt.hash(password, 10);
        }

        targetUser.name = name || targetUser.name;
        targetUser.email = email || targetUser.email;
        targetUser.status = status || targetUser.status;
        await targetUser.save();

        return targetUser;
    },

    deleteUser: async (userId) => {
        const targetUser = await User.findByPk(userId);
        if (!targetUser) {
            throw new Error('User not found.');
        }
        await targetUser.destroy();
    },

    updateUserRole: async (userId, roles) => {
        const targetUser = await User.findByPk(userId);
        if (!targetUser) {
            throw new Error('User not found.');
        }

        if (roles && roles.length > 0) {
            const roleInstances = await Role.findAll({
                where: { id: { [Op.in]: roles } },
            });
            await targetUser.setRoles(roleInstances);
        }

        return targetUser;
    },

    getUserProjects: async (userId) => {
        return await User.findByPk(userId, {
            include: [
                { model: Project, as: 'ClientProjects' },
                { model: Project, as: 'FreelancerProjects' },
            ],
        });
    },

    getUserBugs: async (userId) => {
        return await User.findByPk(userId, {
            include: [
                { model: Bug, as: 'ReportedBugs' },
                { model: Bug, as: 'AssignedBugs' },
            ],
        });
    },

    getAllClients: async () => {
        return await User.findAll({
            include: [{ model: Role, where: { name: 'client' }, attributes: ['name'] }]
        });
    },

    getTeamOnlyMembers: async () => {
        return await User.findAll({
            include: [{
                model: Role, where: {
                    name: { [Op.not]: 'client' }
                }, attributes: ['name']
            }]
        });
    }
};

module.exports = userService;