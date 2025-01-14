const {Team, TeamMember, User} = require("./../../models")

// Get all teams
const getAll = async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: [{
                model: TeamMember,
                include: [{
                    model: User,
                    as: 'User'
                }]
            }]
        });
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching teams', error });
    }
}

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
        return res.status(500).json({ message: 'Error fetching team', error });
    }
}

// Create new team
const create = async (req, res) => {
    try {
        const { name, description, leadId, department } = req.body;
        const team = await Team.create({
            name,
            description,
            leadId,
            department
        });
        return res.status(201).json(team);
    } catch (error) {
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
            teamId,
            userId,
            position,
            status: 'active',
            dateJoined: new Date()
        });

        return res.status(201).json(teamMember);
    } catch (error) {
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
        return res.status(500).json({ message: 'Error removing team member', error });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    addMember,
    removeMember
}