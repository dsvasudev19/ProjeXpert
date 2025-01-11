const { Project, User, Bug } = require('../models');
const { Op } = require('sequelize');

// Get all projects (Admin has access to all)
const getAllProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        // Admin can access all projects
        if (userRole === 'admin') {
            const projects = await Project.findAll({
                include: [
                    { model: User, as: 'Client' },
                    { model: User, as: 'Freelancer' },
                    { model: Bug, as: 'Bugs' },
                ],
            });
            return res.status(200).json(projects);
        }

        // Client or Freelancer can only access their own projects
        const projects = await Project.findAll({
            where: {
                [Op.or]: [
                    { clientId: userId },
                    { freelancerId: userId },
                ],
            },
            include: [
                { model: User, as: 'Client' },
                { model: User, as: 'Freelancer' },
                { model: Bug, as: 'Bugs' },
            ],
        });

        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Get project by ID (Admin has access to all, others can only access their own project)
const getProjectById = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const project = await Project.findByPk(req.params.id, {
            include: [
                { model: User, as: 'Client' },
                { model: User, as: 'Freelancer' },
                { model: Bug, as: 'Bugs' },
            ],
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Admin can access all projects
        if (userRole === 'admin') {
            return res.status(200).json(project);
        }

        // Client or Freelancer can only access their own projects
        if (project.clientId !== userId && project.freelancerId !== userId) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Create a new project (Admin only)
const createProject = async (req, res) => {
    try {
        const userRole = req.user.role;

        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { title, description, budget, status, clientId, freelancerId } = req.body;

        const project = await Project.create({
            title,
            description,
            budget,
            status,
            clientId,
            freelancerId,
        });

        return res.status(201).json({ message: 'Project created successfully.', project });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Update a project (Admin only)
const updateProject = async (req, res) => {
    try {
        const userRole = req.user.role;

        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { title, description, budget, status, clientId, freelancerId } = req.body;
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        project.title = title || project.title;
        project.description = description || project.description;
        project.budget = budget || project.budget;
        project.status = status || project.status;
        project.clientId = clientId || project.clientId;
        project.freelancerId = freelancerId || project.freelancerId;

        await project.save();

        return res.status(200).json({ message: 'Project updated successfully.', project });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Get bugs for a project (Admin can access all, others can only access their own projects)
const getProjectBugs = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const project = await Project.findByPk(req.params.id, {
            include: [{ model: Bug, as: 'Bugs' }],
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        if (userRole === 'admin') {
            return res.status(200).json({ project });
        }

        if (project.clientId !== userId && project.freelancerId !== userId) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        return res.status(200).json({ project });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Assign freelancer to a project (Admin only)
const assignFreelancer = async (req, res) => {
    try {
        const userRole = req.user.role;

        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { freelancerId } = req.body;
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        project.freelancerId = freelancerId;
        await project.save();

        return res.status(200).json({ message: 'Freelancer assigned successfully.', project });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    getProjectBugs,
    assignFreelancer
};
