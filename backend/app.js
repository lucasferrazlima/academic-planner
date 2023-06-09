const express = require('express');

const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const jwtMiddleware = require('./utils/jwtMiddleware');

const tasksRouter = require('./controllers/tasks');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use('/api/login', loginRouter); // login route does not require jwtMiddleware
app.use('/api/users', usersRouter); // user registration route does not require jwtMiddleware
app.use(jwtMiddleware);
app.use('/api/tasks', tasksRouter);

module.exports = app;
