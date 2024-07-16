const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.error('No Authorization header found');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    console.error('No token found after Bearer');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
