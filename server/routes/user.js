const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const UserActivities = require('../models/UserActivities');
const generateJwt = require('../util/generateJwt');

/**
 * @route   POST api/user/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && (await user.checkPassword(req.body.password))) {
      res
        .status(200)
        .cookie('token', generateJwt({ _id: user._id }), { httpOnly: true })
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        });
    } else {
      throw new Error('Username/password incorrect');
    }
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

/**
 * @route   POST api/user/auth
 * @desc    Validate token
 * @access  Private
 */

router.post('/auth', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

/**
 * @route   POST api/user/logout
 * @desc    Logout user
 * @access  Public
 */

router.post('/logout', async (req, res) => {
  res
    .cookie('token', 'null', {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
    })
    .status(200)
    .send();
});

/**
 * @route   POST api/user/signup
 * @desc    Register a new user
 * @access  Public
 */

router.post('/signup', async (req, res) => {
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
    UserActivities.initialize(savedUser._id);

    res
      .status(200)
      .cookie('token', generateJwt({ _id: savedUser._id }), { httpOnly: true })
      .json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        avatar: savedUser.avatar,
      });
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

/**
 * @route   POST api/user/update
 * @desc    Change user profile
 * @access  Private
 */

router.post('/update', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      throw Error('User could not be found');
    }

    user.name = req.body.user.name;
    user.avatar = req.body.user.avatar;

    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(400).json(error.toString());
  }
});

module.exports = router;
