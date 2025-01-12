const { PersonalTodo } = require('../models'); // Adjust the path as needed
const { Op } = require('sequelize');

// Get all todos for the authenticated user
const getAllTodos = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day
    const todos = await PersonalTodo.findAll({
      where: {
        userId: req.user.id,
        createdAt: {
          [Op.gte]: today 
        },
        [Op.or]: [
          { status: { [Op.ne]: 'completed' } },
          { status: 'completed', createdAt: { [Op.gte]: today } }
        ]
      },
      order: [['dueDate', 'ASC']]
    });
    return res.json(todos);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error retrieving todos', error });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const todo = await PersonalTodo.create({
      ...req.body,
      userId: req.user.id,
      status:"pending"
    });
    return res.status(201).json(todo);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating todo', error });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await PersonalTodo.findOne({
      where: { id, userId: req.user.id }
    });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    await todo.update(req.body);
    return res.json(todo);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating todo', error });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await PersonalTodo.findOne({
      where: { id, userId: req.user.id }
    });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    await todo.destroy();
    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting todo', error });
  }
};

// Get todos by status
const getTodosByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const todos = await PersonalTodo.findAll({
      where: { userId: req.user.id, status }
    });
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving todos by status', error });
  }
};

// Get todos by priority
const getTodosByPriority = async (req, res) => {
  try {
    const { priority } = req.params;
    const todos = await PersonalTodo.findAll({
      where: { userId: req.user.id, priority }
    });
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving todos by priority', error });
  }
};

// Mark a todo as complete
const changeStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await PersonalTodo.findOne({
        where: { id, userId: req.user.id }
      });
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      todo.status==="completed"? await todo.update({status:"in-progress"}):await todo.update({ status: 'completed' });
      return res.json(todo);
    } catch (error) {
      return res.status(500).json({ message: 'Error marking todo as complete', error });
    }
  };
  
  // Create a repetitive todo
  const createRepetitiveTodo = async (req, res) => {
    try {
      const { repeatInterval, repeatUntil } = req.body;
      let todo = await PersonalTodo.create({
        ...req.body,
        userId: req.user.id
      });
  
      if (repeatInterval !== 'NONE' && repeatUntil) {
        const todos = [];
        let currentDate = new Date(todo.dueDate);
        while (currentDate <= new Date(repeatUntil)) {
          currentDate = new Date(
            currentDate.setDate(
              currentDate.getDate() + (repeatInterval === 'DAILY' ? 1 : repeatInterval === 'WEEKLY' ? 7 : 30)
            )
          );
          todos.push({
            ...todo.dataValues,
            id: undefined, // Generate new IDs for each repeated todo
            dueDate: currentDate,
            createdAt: undefined,
            updatedAt: undefined
          });
        }
        await PersonalTodo.bulkCreate(todos);
      }
  
      return res.status(201).json(todo);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating repetitive todo', error });
    }
  };
  
  module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByStatus,
    getTodosByPriority,
    changeStatus,
    createRepetitiveTodo
  };
  