const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const generateJwt = require('../util/generateJwt');

/**
 * @route   POST api/user/login
 * @desc    Authorize user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && (await user.checkPassword(req.body.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJwt({ _id: user._id }),
      });
    } else {
      throw new Error('Username/password incorrect');
    }
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

/**
 * @route   POST api/user
 * @desc    Register a new user
 * @access  Public
 */

router.post('/', async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email })) {
      throw new Error('User already exists');
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const savedUser = await newUser.save();
    res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      token: generateJwt({ _id: savedUser._id }),
    });
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

module.exports = router;
