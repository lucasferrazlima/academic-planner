const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // get token from header
  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid authorization token' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = jwtMiddleware;
