const { Bug, User, Project } = require('../models'); // Adjust the path based on your project structure
const { Op } = require('sequelize');

const getAllBugs = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let bugs;
        if (user.role === 'admin') {
            bugs = await Bug.findAll({
                include: [{ model: Project, as: 'Project' }],
            });
        } else {
            bugs = await Bug.findAll({
                include: [
                    {
                        model: Project,
                        as: 'Project',
                        where: { [Op.or]: [{ clientId: userId }, { freelancerId: userId }] },
                    },
                ],
            });
        }

        return res.status(200).json(bugs);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Get a bug by ID (Admins can access any bug; others can access their related projects' bugs)
const getBugById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        const bug = await Bug.findByPk(req.params.id, {
            include: [{ model: Project, as: 'Project' }],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found.' });
        }

        if (
            user.role !== 'admin' &&
            bug.Project.clientId !== userId &&
            bug.Project.freelancerId !== userId
        ) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        return res.status(200).json(bug);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Create a bug (Freelancers and clients can create bugs for their projects)
const createBug = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        const { title, description, status, priority, projectId } = req.body;

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const project = await Project.findByPk(projectId);

        if (!project || (project.clientId !== userId && project.freelancerId !== userId)) {
            return res.status(403).json({ message: 'You can only report bugs for your projects.' });
        }

        const bug = await Bug.create({
            title,
            description,
            status,
            priority,
            projectId,
        });

        return res.status(201).json({ message: 'Bug created successfully.', bug });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Update a bug (Admins can update any bug; others can update their related projects' bugs)
const updateBug = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        const { title, description, status, priority } = req.body;
        const bug = await Bug.findByPk(req.params.id, {
            include: [{ model: Project, as: 'Project' }],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found.' });
        }

        if (
            user.role !== 'admin' &&
            bug.Project.clientId !== userId &&
            bug.Project.freelancerId !== userId
        ) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        bug.title = title || bug.title;
        bug.description = description || bug.description;
        bug.status = status || bug.status;
        bug.priority = priority || bug.priority;

        await bug.save();

        return res.status(200).json({ message: 'Bug updated successfully.', bug });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Delete a bug (Admins can delete any bug; others can delete their related projects' bugs)
const deleteBug = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        const bug = await Bug.findByPk(req.params.id, {
            include: [{ model: Project, as: 'Project' }],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found.' });
        }

        if (
            user.role !== 'admin' &&
            bug.Project.clientId !== userId &&
            bug.Project.freelancerId !== userId
        ) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        await bug.destroy();
        return res.status(200).json({ message: 'Bug deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}
module.exports = {
    getAllBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug
};
