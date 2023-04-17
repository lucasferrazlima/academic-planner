const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
