const { Team, TeamMember, User ,Department} = require("./../../models")

// Get all teams
const getAll = async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: [{
                model: TeamMember,
                include: [{
                    model: User,
                    as: 'User',
                    attributes:['name','email','status']
                }],
                attributes:['position']
            },
            {
                model: User,
                as: 'Lead',
                attributes: ['name','email']
            },
            {
                model:Department,
                attributes:["id",'name']
            }
        ],
        attributes:["id","name","description","createdAt","updatedAt"]
        });
        return res.status(200).json(teams);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error fetching teams', error });
    }
}

// Get teams in grid view format
const getTeamsGridView = async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: [
                {
                    model: TeamMember,
                    include: [{
                        model: User,
                        as: 'User',
                        attributes: ['id', 'name', 'email']
                    }]
                },
                {
                    model: User,
                    as: 'Lead',
                    attributes: ['name', 'id', 'email']
                }
            ]
        });

        // Process the teams data to match grid view requirements
        const formattedTeams = await Promise.all(teams.map(async (team) => {
            // Count team members
            const membersCount = team.TeamMembers ? team.TeamMembers.length : 0;
            
            // Get lead name
            const leadName = team.Lead ? team.Lead.name : 'No Lead Assigned';
            
            // Get active and completed projects for team members
            let activeProjects = 0;
            let completedProjects = 0;
            
            // Get all team member IDs
            const teamMemberIds = team.TeamMembers.map(member => member.id);
            
            // Only query if there are team members
            if (teamMemberIds.length > 0) {
                // Get projects through ProjectAssignment
                const { Project, ProjectAssignment } = require("./../../models");
                
                const projectCounts = await Project.findAll({
                    include: [{
                        model: ProjectAssignment,
                        where: {
                            teamMemberId: teamMemberIds
                        },
                        attributes: []
                    }],
                    attributes: [
                        'status',
                        [sequelize.fn('COUNT', sequelize.col('Project.id')), 'count']
                    ],
                    group: ['status']
                });
                
                // Count active and completed projects
                projectCounts.forEach(projectCount => {
                    if (projectCount.status === 'In Progress') {
                        activeProjects = parseInt(projectCount.get('count'));
                    } else if (projectCount.status === 'Completed') {
                        completedProjects = parseInt(projectCount.get('count'));
                    }
                });
            }
            
            // Calculate mock performance score (this would ideally come from a performance metrics table)
            // For demo purposes, we'll generate a random score between 70-98
            const performance = Math.floor(Math.random() * 28) + 70;
            
            return {
                id: team.id,
                name: team.name,
                description: team.description,
                department: team.department,
                members: membersCount,
                lead: leadName,
                performance: performance,
                activeProjects: activeProjects,
                completedProjects: completedProjects
            };
        }));

        return res.status(200).json(formattedTeams);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching teams grid view', error });
    }
};

// Get single team by ID
const getById = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id, {
            include: [{
                model: TeamMember,
                include: [{
                    model: User,
                    as: 'User'
                }]
            }]
        });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        return res.status(200).json(team);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error fetching team', error });
    }
}

// Create new team
const create = async (req, res) => {
    try {
        const { name, description, leadId, department:departmentId } = req.body;
        const team = await Team.create({
            name,
            description,
            leadId,
            departmentId
        });
        if(Array.isArray(req.body.memberIds) && req.body.memberIds.length>0){
            const teamMembers=req.body.memberIds.map((id)=> {return {
                dateJoined:new Date(),
                userId:id,
                teamId:team.id
            }})
            await TeamMember.bulkCreate(teamMembers)
        }
        return res.status(201).json(team);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error creating team', error });
    }
}

// Update team
const update = async (req, res) => {
    try {
        const { name, description, leadId, department } = req.body;
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        await team.update({
            name,
            description,
            leadId,
            department
        });

        return res.status(200).json(team);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error updating team', error });
    }
}

// Delete team
const remove = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        await team.destroy();
        return res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error deleting team', error });
    }
}

// Add member to team
const addMember = async (req, res) => {
    try {
        const { teamId, userId, position } = req.body;

        // Check if team exists
        const team = await Team.findByPk(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Check if user is already a member
        const existingMember = await TeamMember.findOne({
            where: { teamId, userId }
        });

        if (existingMember) {
            return res.status(400).json({ message: 'User is already a team member' });
        }

        const teamMember = await TeamMember.create({
            userId,
            position,
            status: 'active',
            dateJoined: new Date()
        });

        await team.addTeamMember(teamMember);

        return res.status(201).json(teamMember);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error adding team member', error });
    }
}

// Remove member from team
const removeMember = async (req, res) => {
    try {
        const { teamId, userId } = req.params;

        const teamMember = await TeamMember.findOne({
            where: { teamId, userId }
        });

        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        await teamMember.destroy();
        return res.status(200).json({ message: 'Team member removed successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error removing team member', error });
    }
}

const getTeamMembers = async (req, res, next) => {
    try {
        const members = await TeamMember.findAll({
            where: {
                teamId: req.params.id
            },
            include: [
                {
                    model: User,
                    as: 'User'
                }
            ]
        })
        return res.status(200).json(members)
    } catch (error) {
        console.log(error)

        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    addMember,
    removeMember,
    getTeamMembers
}