const { Project, TeamMember, Team, User } = require("./../../models")

const assignEmployeeToProject = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id)
        if (!project) {
            return res.status(404).json({ success: true, message: "Project not found" })
        }
        const teamMember = await TeamMember.findByPk(req.body.userId)
        if (!teamMember) {
            return res.status(404).json({ success: true, message: "Team Member not found" })
        }
        await project.addTeamMembers(teamMember)
        return res.status(200).json({ success: true, message: "Successfully Assigned Employee to Project" })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getAllAssigneeOfProject = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [
                {
                    model: TeamMember,
                    include: { model: User, as: "User" }
                }
            ]
        })

        if (!project) {
            return res.status(404).json({ success: true, message: "Project not found" })
        }

        const members = project.TeamMembers?.map(member => {
            return { name: member.User.name, email: member.User.email, phone: member.User.phone, githubId: member.User.githubId, position: member.position }
        })

        return res.status(200).json(members)


    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllAssigneeOfProject,
    assignEmployeeToProject
}