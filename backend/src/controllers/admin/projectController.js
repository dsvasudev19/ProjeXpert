// controllers/projectController.js
const { Project, User, Bug, Task, File, TeamMember, Role, Department } = require('../../models');

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
                { model: TeamMember, include: { model: User, as: "User" } },
                { model: Department }
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
        
        if (userRole === 'admin' || userRole === 'client') {
            const { 
                // Core Project Data
                name, 
                description, 
                projectType,
                clientInfo,
                status,
                priority,
                
                // Timeline Information
                startDate,
                targetEndDate,
                estimatedDuration,
                
                // Resource Management
                projectManager,
                teamMembers,
                departments,
                
                // Financial Information
                budget,
                billingRate,
                revenueProjection,
                
                // Scope Information
                projectGoals,
                deliverables,
                requirements,
                constraints,
                acceptanceCriteria,
                
                // GitHub Repository Settings
                createGithubRepo,
                repoName,
                repoVisibility,
                collaborators,
                
                // Client ID for association
                clientId 
            } = req.body;

            // Create the main project
            const project = await Project.create({
                name,
                description,
                projectType,
                clientInfo,
                status: status || 'Not Started',
                priority: priority || 'Medium',
                startDate,
                targetEndDate,
                estimatedDuration,
                projectManager,
                teamMembers,
                budget,
                billingRate,
                revenueProjection,
                projectGoals,
                deliverables,
                requirements,
                constraints,
                acceptanceCriteria,
                hasGithubRepo: !!createGithubRepo,
                repoName: createGithubRepo ? (repoName || name.replace(/\s+/g, '-').toLowerCase()) : null,
                repoVisibility: repoVisibility || 'private',
                repoCollaborators: collaborators,
                clientId: clientId || userId
            });

            // Associate departments if any were provided
            if (departments && departments.length > 0) {
                const deptRecords = await Department.findAll({
                    where: {
                        name: departments
                    }
                });
                
                if (deptRecords.length > 0) {
                    await project.setDepartments(deptRecords);
                }
            }
    
            return res.status(201).json({ message: 'Project created successfully.', project });
        } else {
            return res.status(403).json({ message: 'Only admins and clients can create projects' });
        }
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
        if (userRole !== 'admin' && project.clientId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Extract all potential update fields from request body
        const { 
            // Core Project Data
            name, 
            description, 
            projectType,
            clientInfo,
            status,
            priority,
            
            // Timeline Information
            startDate,
            targetEndDate,
            estimatedDuration,
            
            // Resource Management
            projectManager,
            teamMembers,
            departments,
            
            // Financial Information
            budget,
            billingRate,
            revenueProjection,
            
            // Scope Information
            projectGoals,
            deliverables,
            requirements,
            constraints,
            acceptanceCriteria,
            
            // GitHub Repository Settings
            createGithubRepo,
            repoName,
            repoVisibility,
            collaborators,
            
            // Client ID for association
            clientId 
        } = req.body;

        // Update project fields
        if (name) project.name = name;
        if (description !== undefined) project.description = description;
        if (projectType !== undefined) project.projectType = projectType;
        if (clientInfo !== undefined) project.clientInfo = clientInfo;
        if (status) project.status = status;
        if (priority) project.priority = priority;
        if (startDate) project.startDate = startDate;
        if (targetEndDate) project.targetEndDate = targetEndDate;
        if (estimatedDuration !== undefined) project.estimatedDuration = estimatedDuration;
        if (projectManager !== undefined) project.projectManager = projectManager;
        if (teamMembers !== undefined) project.teamMembers = teamMembers;
        if (budget !== undefined) project.budget = budget;
        if (billingRate !== undefined) project.billingRate = billingRate;
        if (revenueProjection !== undefined) project.revenueProjection = revenueProjection;
        if (projectGoals !== undefined) project.projectGoals = projectGoals;
        if (deliverables !== undefined) project.deliverables = deliverables;
        if (requirements !== undefined) project.requirements = requirements;
        if (constraints !== undefined) project.constraints = constraints;
        if (acceptanceCriteria !== undefined) project.acceptanceCriteria = acceptanceCriteria;
        
        // GitHub settings
        if (createGithubRepo !== undefined) {
            project.hasGithubRepo = !!createGithubRepo;
            if (createGithubRepo && !project.repoName) {
                project.repoName = repoName || project.name.replace(/\s+/g, '-').toLowerCase();
            }
        }
        if (repoName !== undefined) project.repoName = repoName;
        if (repoVisibility !== undefined) project.repoVisibility = repoVisibility;
        if (collaborators !== undefined) project.repoCollaborators = collaborators;
        
        // Client ID if admin is reassigning the project
        if (clientId !== undefined && userRole === 'admin') project.clientId = clientId;

        await project.save();

        // Update departments if provided
        if (departments && Array.isArray(departments)) {
            const deptRecords = await Department.findAll({
                where: {
                    name: departments
                }
            });
            
            await project.setDepartments(deptRecords);
        }

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
        if (userRole !== 'admin' && project.clientId !== userId) {
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
        if (userRole !== 'admin' && project.clientId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        return res.status(200).json({ project });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// New method to handle GitHub repo creation or updates
const manageGithubRepo = async (req, res) => {
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

        // Check if user has access to this project
        if (userRole !== 'admin' && project.clientId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { 
            createGithubRepo,
            repoName, 
            repoVisibility, 
            addCollaborators,
            collaborators 
        } = req.body;

        // Update GitHub settings
        project.hasGithubRepo = !!createGithubRepo;
        
        if (createGithubRepo) {
            project.repoName = repoName || project.name.replace(/\s+/g, '-').toLowerCase();
            project.repoVisibility = repoVisibility || 'private';
            
            if (addCollaborators) {
                project.repoCollaborators = collaborators;
            }
            
            // Here you would integrate with GitHub API to actually create the repo
            // For now, we'll just update the database values
        } else {
            project.repoName = null;
            project.repoVisibility = 'private';
            project.repoCollaborators = null;
        }

        await project.save();

        return res.status(200).json({ 
            message: createGithubRepo ? 'GitHub repository settings updated.' : 'GitHub repository removed.',
            project 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectBugs,
    manageGithubRepo
};