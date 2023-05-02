const express = require('express');
const jwtMiddleware = require('./utils/jwtMiddleware');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

const tasksRouter = require('./controllers/tasks');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message));

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

app.use('/api/login', loginRouter); // login route does not require jwtMiddleware
app.use(jwtMiddleware);
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

module.exports = app;
