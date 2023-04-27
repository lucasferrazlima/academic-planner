const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // get token from header
  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken; // add user to request
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = jwtMiddleware;
