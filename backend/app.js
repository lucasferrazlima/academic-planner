const express = require('express');

const app = express();
const mongoose = require('mongoose');

const tasksRouter = require('./controllers/tasks');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message));

app.use(express.json());
app.use(express.static('build'));

app.use('/api/tasks', tasksRouter);

module.exports = app;
