const { Task,User,Project } = require('../../models');

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

        let whereCondition = {};

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
        res.status(500).json({ error: error.message });
    }
}
const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
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
        res.status(400).json({ error: error.message });
    }
}
const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            task.status = req.body.status;
            task.progress=100;
            await task.save();

            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports={
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    assignTask,
    updateTaskStatus
}