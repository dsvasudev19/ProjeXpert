// // controllers/projectController.js
// const { Project, User, Bug, Task, File,TeamMember,Role } = require('../../models');

// const getAllProjects = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const user = await User.findOne({
//             where: { id: userId },
//             include: [{ model: Role }]
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const userRole = user.Roles[0].name;

//         const includeModels = req.query.include === 'true' || req.query.include === undefined; 
//         const includeFiles = req.query.files === 'true';
//         console.log(req.query)

//         let whereCondition = {};
//         if (userRole !== 'admin') {
//             whereCondition.clientId = userId;
//         }

//         const projects = await Project.findAll({
//             where: whereCondition,
//             include: [
//                 ...(includeModels ? [
//                     { model: User, as: 'Client', attributes: ['name', 'id', 'email'] },
//                     { model: Bug, as: 'Bugs' },
//                 ] : []),
//                 ...(includeFiles && !includeModels ? [{ model: File }] : []),
//             ],
//         });

//         return res.status(200).json(Array.isArray(projects) ? projects : projects.rows);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error.', error });
//     }
// };

// const getProjectById = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findOne({
//             where: { id: userId },
//             include: [{ model: Role }]
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const userRole = user.Roles[0].name;
//         const project = await Project.findByPk(req.params.id, {
//             include: [
//                 { model: User, as: 'Client', attributes: ['id', 'name'] },
//                 { model: Bug, as: 'Bugs' },
//                 { model: Task, as: 'Tasks', include: [{ model: User, as: "Assignee" }] },
//                 { model: File },
//                 { model: TeamMember, include: { model: User, as: "User" } }
//             ],
//         });

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found.' });
//         }

//         // Check if user has access to this project
//         if (userRole !== 'admin' && project.clientId !== userId) {
//             return res.status(403).json({ message: 'Access denied' });
//         }

//         return res.status(200).json(project);
//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({ message: 'Internal server error.', error });
//     }
// };

// const createProject = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findOne({
//             where: { id: userId },
//             include: [{ model: Role }]
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const userRole = user.Roles[0].name;

//         if (userRole === 'admin' || userRole === 'client') {
//             const { name, description, budget, status, startDate, endDate, priority,clientId } = req.body;


//             const project = await Project.create({
//                 name,
//                 description,
//                 budget,
//                 status,
//                 clientId,
//                 startDate,
//                 endDate,
//                 priority
//             });

//             return res.status(201).json({ message: 'Project created successfully.', project });
//         } else {
//             return res.status(403).json({ message: 'Only admins and clients can create projects' });
//         }


//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error.', error });
//     }
// };

// const updateProject = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findOne({
//             where: { id: userId },
//             include: [{ model: Role }]
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const userRole = user.Roles[0].name;
//         const project = await Project.findByPk(req.params.id);

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found.' });
//         }

//         // Allow admin to update any project, clients can only update their own projects
//         if (userRole !== 'admin' || project.clientId !== userId) {
//             return res.status(403).json({ message: 'Access denied' });
//         }

//         const { title, description, budget, status, clientId } = req.body;

//         project.title = title || project.title;
//         project.description = description || project.description;
//         project.budget = budget || project.budget;
//         project.status = status || project.status;
//         project.clientId = clientId || project.clientId;

//         await project.save();

//         return res.status(200).json({ message: 'Project updated successfully.', project });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error.', error });
//     }
// };

// const deleteProject = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findOne({
//             where: { id: userId },
//             include: [{ model: Role }]
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const userRole = user.Roles[0].name;
//         const project = await Project.findByPk(req.params.id);

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found.' });
//         }

//         // Only admin can delete any project, clients can only delete their own projects
//         if (userRole !== 'admin' || project.clientId !== userId) {
//             return res.status(403).json({ message: 'Access denied' });
//         }

//         await project.destroy();
//         return res.status(200).json({ message: 'Project deleted successfully.' });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error.', error });
//     }
// };

// const getProjectBugs = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findOne({
//             where: { id: userId },
//             include: [{ model: Role }]
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const userRole = user.Roles[0].name;
//         const project = await Project.findByPk(req.params.id, {
//             include: [{ model: Bug, as: 'Bugs' }],
//         });

//         if (!project) {
//             return res.status(404).json({ message: 'Project not found.' });
//         }

//         // Check if user has access to this project
//         if (userRole !== 'admin' || project.clientId !== userId) {
//             return res.status(403).json({ message: 'Access denied' });
//         }

//         return res.status(200).json({ project });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal server error.', error });
//     }
// };

// // const assignFreelancer = async (req, res) => {
// //     try {
// //         const { freelancerId } = req.body;
// //         const project = await Project.findByPk(req.params.id);

// //         if (!project) {
// //             return res.status(404).json({ message: 'Project not found.' });
// //         }

// //         if (req.user.role !== 'client' || project.clientId !== req.user.id) {
// //             return res.status(403).json({ message: 'Forbidden: Only clients can assign freelancers to their projects.' });
// //         }

// //         project.freelancerId = freelancerId;
// //         await project.save();

// //         return res.status(200).json({ message: 'Freelancer assigned successfully.', project });
// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).json({ message: 'Internal server error.', error });
// //     }
// // };

// module.exports = {
//     getAllProjects,
//     getProjectById,
//     createProject,
//     updateProject,
//     deleteProject,
//     getProjectBugs,
//     // assignFreelancer
// };



'use strict';

const { Project, GithubDetail, ProjectAssignment, Milestone, User, Role, Bug, Task, File, ProjectCollaborator, PaymentSchedule } = require('../../models');
const GitHubService = require("./../../services/githubService")
const readmeService = require("./../../services/readmeService")
// Get all projects with basic associations
exports.getAllProjects = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles?.[0]?.name; // Ensure role retrieval is safe

        const includeModels = req.query.include === 'true' || req.query.include === undefined;
        const includeFiles = req.query.files === 'true';

        let whereCondition = {};
        if (userRole !== 'admin') {
            whereCondition.clientId = userId;
        }

        const includeOptions = {};
        if (includeModels) {
            includeOptions.include = [
                { model: User, as: 'Client', attributes: ['name', 'id', 'email'] },
                { model: Bug, as: 'Bugs' }
            ];
        } else if (includeFiles) {
            includeOptions.include = [{ model: File }];
        }

        const projects = await Project.findAll({
            where: whereCondition,
            ...includeOptions
        });

        return res.status(200).json(Array.isArray(projects) ? projects : projects.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};


// Get a single project—with all associations
exports.getProjectById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles?.[0]?.name; // Safe role retrieval

        const project = await Project.findByPk(req.params.id, {
            include: [
                { model: User, as: 'Client', attributes: ['id', 'name'] },
                { model: User, as: 'ProjectManager', attributes: ['id', 'name'] },
                { model: Milestone },
                { model: Bug, as: 'Bugs' },
                { model: Task, as: 'Tasks', include: [{ model: User, as: "Assignee" }] },
                { model: PaymentSchedule }
                // { model: File },
                // { model: TeamMember, include: { model: User, as: "User" } }
            ],
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Role-based access control
        if (userRole !== 'admin' && project.clientId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};
// Create a new project with associated data
exports.createProject = async (req, res) => {
    const transaction = await Project.sequelize.transaction();
    try {
        const projectData = req.body;
        console.log(req.body);

        // Create the project
        const project = await Project.create({
            name: projectData.projectName,
            description: projectData.description,
            projectType: projectData.projectType,
            clientId: projectData.clientId,
            status: projectData.status,
            priority: projectData.priority,
            startDate: projectData.startDate,
            endDate: projectData.targetEndDate,
            estimatedDuration: projectData.estimatedDuration,
            budget: projectData.budget,
            billingRate: projectData.billingRate,
            revenueProjection: projectData.revenueProjection,
            projectGoals: projectData.projectGoals,
            deliverables: projectData.deliverables,
            requirements: projectData.requirements,
            constraints: projectData.constraints,
            acceptanceCriteria: projectData.acceptanceCriteria,
            projectManager: projectData.projectManager
        }, { transaction });

        // Create GitHub details if requested
        if (projectData.createGithubRepo) {
            // Step 1: Create the repository on GitHub
            const repoData = await GitHubService.createRepository(
                projectData.repoName,
                projectData.description.slice(0, 310),
                projectData.repoVisibility === "private"
            );

            let generatedReadme = await readmeService.generateProjectReadme(projectData.description);

            let readmeData = await GitHubService.addReadmeToRepo(projectData.repoName, generatedReadme.data);

            console.log(readmeData)

            await GithubDetail.create({
                projectId: project.id,
                createGithubRepo: projectData.createGithubRepo,
                repoName: projectData.repoName,
                repoVisibility: projectData.repoVisibility,
                addCollaborators: projectData.addCollaborators,
                collaborators: projectData.collaborators, // Now included
                repoUrl: projectData.repoName ? `https://github.com/dsvasudev19/${projectData.repoName}` : null
            }, { transaction });


        }

        let payments = [];
        if (Array.isArray(projectData.milestones) && projectData.milestones.length > 0) {
            const milestones = projectData.milestones.map(milestone => ({
                title: milestone.title,
                description: milestone.description || null,
                projectId: project.id,
                dueDate: milestone.dueDate,
                completionDate: milestone.completionDate || null,
                status: milestone.status,
                progress: milestone.progress,
                deliverables: milestone.deliverables || null,
                clientApprovalRequired: milestone.clientApprovalRequired,
                clientApproved: milestone.clientApproved,
                clientApprovalDate: milestone.clientApprovalDate || null,
                paymentPercentage: milestone.paymentPercentage,
            }));

            const createdMilestones = await Milestone.bulkCreate(milestones, { transaction, returning: true });

            // Create Payment records based on milestones
            payments = createdMilestones.map((milestone, index) => {
                const milestoneData = projectData.milestones[index]; // Original milestone data for paymentPercentage
                const paymentAmount = (project.budget * (milestoneData.paymentPercentage / 100)).toFixed(2);

                return {
                    milestoneTitle:milestone.title,
                    amount: paymentAmount,
                    status: 'Pending', // Default status
                    projectId: project.id,
                    dueDate: milestone.dueDate,
                    percentage: milestone.paymentPercentage,
                    clientApproval: 'Pending'
                };
            });

            // Calculate total payment percentage and create additional payment if needed
            const totalPaymentPercentage = projectData.milestones.reduce(
                (sum, milestone) => sum + (milestone.paymentPercentage || 0),
                0
            );

            if (totalPaymentPercentage < 100) {
                const remainingPercentage = 100 - totalPaymentPercentage;
                const remainingAmount = (project.budget * (remainingPercentage / 100)).toFixed(2);

                payments.push({
                    amount: remainingAmount,
                    status: 'Pending',
                    milestoneTitle:'Remaining Amount',
                    projectId: project.id,
                    dueDate: new Date(projectData.targetEndDate),
                    percentage: remainingPercentage,
                    clientApproval: 'Pending'
                });
            }

            await PaymentSchedule.bulkCreate(payments, { transaction });
        }

        // Create team member assignments
        //   if (Array.isArray(projectData.teamMembers) && projectData.teamMembers.length > 0) {
        //     const teamMembers = projectData.teamMembers.map(memberId => ({
        //       projectId: project.id,
        //       teamMemberId: memberId, // No need to parseInt since IDs might be strings
        //       role: 'Developer', // Default role, could be made configurable
        //       assignedDate: new Date()
        //     }));
        //     await ProjectAssignment.bulkCreate(teamMembers, { transaction });
        //   }

        // Store departments if provided
        //   if (Array.isArray(projectData.departments) && projectData.departments.length > 0) {
        //     const departmentEntries = projectData.departments.map(department => ({
        //       projectId: project.id,
        //       departmentName: department
        //     }));
        //     await Department.bulkCreate(departmentEntries, { transaction });
        //   }


        const collaborators = req.body.collaborators.split(",")
        if (Array.isArray(collaborators) && collaborators.length > 0) {
            const collaboratorsMap = collaborators.map((item) => {
                return {
                    githubUsername: item,
                    projectId: project.id
                }
            })

            await ProjectCollaborator.bulkCreate(collaboratorsMap, { transaction })
        }

        await transaction.commit();
        return res.status(201).json({
            success: true,
            data: project,
            message: 'Project created successfully'
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error creating project'
        });
    }
};

// Update project details
exports.updateProject = async (req, res) => {
    const transaction = await Project.sequelize.transaction();
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        const projectData = req.body;
        await project.update({
            name: projectData.projectName,
            description: projectData.description,
            status: projectData.status,
            priority: projectData.priority,
            endDate: projectData.targetEndDate,
            budget: projectData.budget,
            // ... other fields as needed
        }, { transaction });

        // Update GitHub details if provided
        if (projectData.createGithubRepo !== undefined) {
            const githubDetails = await GithubDetail.findOne({ where: { projectId: project.id } });
            if (githubDetails) {
                await githubDetails.update({
                    createGithubRepo: projectData.createGithubRepo,
                    repoName: projectData.repoName,
                    repoVisibility: projectData.repoVisibility,
                    addCollaborators: projectData.addCollaborators
                }, { transaction });
            }
        }

        await transaction.commit();
        return res.status(200).json({
            success: true,
            data: project,
            message: 'Project updated successfully'
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete project and associated data
exports.deleteProject = async (req, res) => {
    const transaction = await Project.sequelize.transaction();
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Delete associated records first due to foreign key constraints
        await GithubDetail.destroy({ where: { projectId: project.id }, transaction });
        await Milestone.destroy({ where: { projectId: project.id }, transaction });
        await ProjectAssignment.destroy({ where: { projectId: project.id }, transaction });

        await project.destroy({ transaction });
        await transaction.commit();

        return res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


exports.getProjectBugs = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        next(error)
    }
}