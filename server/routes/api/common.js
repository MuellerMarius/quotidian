const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Entry = require('../../models/Entry');
const UserActivities = require('../../models/UserActivities');

/**
 * @route   GET api/
 * @desc    Get all entries and activities from a specific user
 * @access  Private
 */

router.get('/', auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.sub }).sort({ date: -1 });
    const userActivities = await UserActivities.findOne({ user: req.user.sub });

    res.status(200).json({ entries, activities: userActivities.categories });
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

module.exports = router;
