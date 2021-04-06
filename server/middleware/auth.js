const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;

    if (!token) {
      throw new Error('No auth-token provided.');
    } else {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      req.user = await User.findById(decoded._id).select('-password');
      next();
    }
  } catch (error) {
    res.status(401).send(error.toString());
  }
};

module.exports = auth;
