const jwt = require('jsonwebtoken');

const generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, { expiresIn: '10d' });
};

module.exports = generateJwt;
