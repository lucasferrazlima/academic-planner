const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

usersRouter.post('/', async (req, res) => {
  const {
    username, name, email, password,
  } = req.body;

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET_KEY);

  res.status(201).json(
    {
      token,
      username: savedUser.username,
      name: savedUser.name,
      email: savedUser.email,
      id: savedUser._id,
    },
  );
});

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete user
usersRouter.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = usersRouter;
