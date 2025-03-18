// controllers/admin/bugController.js
const { Bug, User,Role } = require('../../models');
const bugService = require('../../services/bugService');

const getAllBugs = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId,{
        include:[{model:Role}]
    });
    user.role=user.Roles[0].name
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const bugs = await bugService.getAllBugsForUser(user);
    return res.status(200).json(bugs);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

const getBugById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const bug = await bugService.getBugByIdWithProject(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found.' });

    if (!bugService.isUserAuthorized(user, bug)) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    return res.status(200).json(bug);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

const createBug = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const { title, description, status, severity:priority, project:projectId, assignedTo:assigneeId,tags,dueDate } = req.body;
    // Optional: add validations or authorization checks regarding project here.

    const bug = await bugService.createBug({
      title,
      description,
      status,
      priority,
      projectId,
      assigneeId,
      tags,
      dueDate:new Date(dueDate),
      reportedById:req.user.id
    });

    return res.status(201).json({ message: 'Bug created successfully.', bug });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

const updateBug = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const bug = await bugService.getBugByIdWithProject(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found.' });

    if (!bugService.isUserAuthorized(user, bug)) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const { title, description, status, priority } = req.body;
    const updatedBug = await bugService.updateBug(bug, {
      title: title || bug.title,
      description: description || bug.description,
      status: status || bug.status,
      priority: priority || bug.priority,
    });

    return res.status(200).json({ message: 'Bug updated successfully.', bug: updatedBug });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

const deleteBug = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const bug = await bugService.getBugByIdWithProject(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found.' });

    if (!bugService.isUserAuthorized(user, bug)) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    await bugService.deleteBug(bug);
    return res.status(200).json({ message: 'Bug deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

const resolveBug = async (req, res) => {
  try {
    const bug = await bugService.getBugByIdWithProject(req.params.id);
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    
    await bugService.resolveBug(bug, req.body.resolution);
    return res.status(200).json({ success: true, message: "Successfully closed the bug" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};

const getProjectBugs = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const include = req.query.include === 'true'; // Convert string 'true' to boolean
    const bugs = await bugService.getBugsByProjectId(projectId, include);
    return res.status(200).json({
      success: true,
      data: bugs,
      message: 'Bugs retrieved successfully',
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error retrieving bugs',
    });
  }
};


module.exports = {
  getAllBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
  resolveBug,
  getProjectBugs
};
