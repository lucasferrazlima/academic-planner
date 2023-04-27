const tasksRouter = require('express').Router();
const Task = require('../models/Task');
const jwtMiddleware = require('../utils/jwtMiddleware');

// get all tasks
tasksRouter.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a single task
tasksRouter.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a new task
tasksRouter.post('/', async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      user: req.user.id,
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create task' });
  }
});

// update a task
tasksRouter.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      },
    );
    if (!task) {
      res.status(404).json({ message: 'task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete a task
tasksRouter.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'task not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = tasksRouter;
