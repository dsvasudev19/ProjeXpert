const { Task, User, Project, Role } = require('../../models');
const { sequelize } = require("../../models")
const { Op } = require("sequelize")
const crypto=require("crypto")
const getAllTasks = async (req, res) => {
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

        let whereCondition = {
            status: {
                [Op.ne]: "Completed"
            }
        };

        if (userRole !== 'admin') {
            whereCondition.assigneeId = userId;
        }

        const tasks = await Task.findAll({
            where: whereCondition,
            include: [
                { model: User, as: 'Assignee' },
                { model: Project },
                { model: Task, as: 'ParentTask' },
                { model: Task, as: 'SubTasks' }
            ]
        });

        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
// Example logic for handling task creation in your controller
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, assigneeId, projectId, parentTaskId, progress } = req.body;

        // If parentTaskId is an empty string, set it to null
        const sanitizedParentTaskId = parentTaskId === '' ? null : parentTaskId;

        const newTask = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            assigneeId,
            projectId,
            parentTaskId: sanitizedParentTaskId, // Pass the sanitized value
            progress,
            refId:crypto.randomBytes(3).toString("hex").toUpperCase(),
        });

        return res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ error: 'An error occurred while creating the task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const [updated] = await Task.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedTask = await Task.findByPk(req.params.id);
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}
const deleteTask = async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
const assignTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            task.assigneeId = req.body.assigneeId;
            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}
const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            task.status = req.body.status;
            task.progress = 100;
            await task.save();

            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

const updateTaskProgress = async (req, res) => {
    const t = await sequelize.transaction(); // Begin a transaction

    try {
        const task = await Task.findByPk(req.params.id, { transaction: t });

        if (!task) {
            // Task not found
            return res.status(404).json({ message: 'Task not found' });
        }

        // Validate the 'progress' field if provided
        if (req.body.progress !== undefined) {
            if (typeof req.body.progress !== 'number' || req.body.progress < 0 || req.body.progress > 100) {
                return res.status(400).json({ message: 'Progress must be a number between 0 and 100' });
            }
            task.progress = req.body.progress;
        }

        // Validate and update 'status' field if provided
        if (req.body.status !== undefined) {
            if (typeof req.body.status !== 'string' || !['Pending', 'In Progress', 'completed'].includes(req.body.status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }
            task.status = req.body.status;
        }

        // Save the task changes in the transaction
        await task.save({ transaction: t });

        // Commit the transaction
        await t.commit();

        res.json(task);
    } catch (error) {
        // Rollback the transaction in case of an error
        await t.rollback();

        console.error(error);
        res.status(500).json({ error: 'Something went wrong, please try again later' });
    }
};


const searchTasks = async (req, res) => {
    try {
        const { searchText } = req.query;

        const userId = req.user.id;

        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles[0].name;


        // If searchText is provided, match it with title, description, project name, and assigneeId
        const whereClause = {
            [Op.or]: [
                { title: { [Op.like]: `%${searchText}%` } },
                { description: { [Op.like]: `%${searchText}%` } },
                {
                    refId: {
                        [Op.like]: `%${searchText}%`
                    }
                }
            ],
            status: {
                [Op.ne]: "Completed"
            }
        };

        if (userRole !== 'admin') {
            whereClause.assigneeId = userId;
        }

        const includeModels = [];

        // If searchText should match project name, include the Project model in the search
        includeModels.push({
            model: Project,
            where: {
                name: { [Op.like]: `%${searchText}%` },
                ...(userRole !== 'admin' ? { clientId: req.user.id } : {})
            }
        });

        // If searchText should match assigneeId, include the User model (Assignee)
        includeModels.push({
            model: User,
            as: 'Assignee',
            where: { name: { [Op.like]: `%${searchText}%` } }, // Assuming assignee name or another field to match
            required: false,  // Optional for this search
        });

        const tasks = await Task.findAll({
            where: whereClause,
            include: includeModels,
        });

        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};



module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    assignTask,
    updateTaskStatus,
    updateTaskProgress,
    searchTasks
}