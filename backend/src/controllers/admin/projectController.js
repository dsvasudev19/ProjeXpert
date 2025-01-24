// controllers/projectController.js
const { Project, User, Bug, Task, File,TeamMember,Role } = require('../../models');

const getAllProjects = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles[0].name;
        
        const includeModels = req.query.include === 'true' || req.query.include === undefined; 
        const includeFiles = req.query.files === 'true';
        console.log(req.query)

        let whereCondition = {};
        if (userRole !== 'admin') {
            whereCondition.clientId = userId;
        }
        
        const projects = await Project.findAll({
            where: whereCondition,
            include: [
                ...(includeModels ? [
                    { model: User, as: 'Client', attributes: ['name', 'id', 'email'] },
                    { model: Bug, as: 'Bugs' },
                ] : []),
                ...(includeFiles && !includeModels ? [{ model: File }] : []),
            ],
        });

        return res.status(200).json(Array.isArray(projects) ? projects : projects.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

const getProjectById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles[0].name;
        const project = await Project.findByPk(req.params.id, {
            include: [
                { model: User, as: 'Client', attributes: ['id', 'name'] },
                { model: Bug, as: 'Bugs' },
                { model: Task, as: 'Tasks', include: [{ model: User, as: "Assignee" }] },
                { model: File },
                { model: TeamMember, include: { model: User, as: "User" } }
            ],
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Check if user has access to this project
        if (userRole !== 'admin' && project.clientId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

const createProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles[0].name;
        if (userRole !== 'admin' || userRole !== 'client') {
            return res.status(403).json({ message: 'Only admins and clients can create projects' });
        }

        const { name, description, budget, status, startDate, endDate, priority,clientId } = req.body;

        const project = await Project.create({
            name,
            description,
            budget,
            status,
            clientId,
            startDate,
            endDate,
            priority
        });

        return res.status(201).json({ message: 'Project created successfully.', project });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

const updateProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles[0].name;
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Allow admin to update any project, clients can only update their own projects
        if (userRole !== 'admin' || project.clientId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { title, description, budget, status, clientId } = req.body;

        project.title = title || project.title;
        project.description = description || project.description;
        project.budget = budget || project.budget;
        project.status = status || project.status;
        project.clientId = clientId || project.clientId;

        await project.save();

        return res.status(200).json({ message: 'Project updated successfully.', project });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

const deleteProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles[0].name;
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Only admin can delete any project, clients can only delete their own projects
        if (userRole !== 'admin' || project.clientId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await project.destroy();
        return res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

const getProjectBugs = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles[0].name;
        const project = await Project.findByPk(req.params.id, {
            include: [{ model: Bug, as: 'Bugs' }],
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Check if user has access to this project
        if (userRole !== 'admin' || project.clientId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        return res.status(200).json({ project });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// const assignFreelancer = async (req, res) => {
//     try {
//         const { freelancerId } = req.body;
//         const project = await Project.findByPk(req.params.id);

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found.' });
//         }

//         if (req.user.role !== 'client' || project.clientId !== req.user.id) {
//             return res.status(403).json({ message: 'Forbidden: Only clients can assign freelancers to their projects.' });
//         }

//         project.freelancerId = freelancerId;
//         await project.save();

//         return res.status(200).json({ message: 'Freelancer assigned successfully.', project });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error.', error });
//     }
// };

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectBugs,
    // assignFreelancer
};
