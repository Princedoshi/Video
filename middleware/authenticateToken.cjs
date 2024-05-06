const jwt = require('jsonwebtoken');
const config = require('../config.cjs');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  

  // Check if token exists
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const tokenParts = token.split(' ');
  const accessToken = tokenParts[1];

  // Verify the token
  jwt.verify(accessToken, config.secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};
