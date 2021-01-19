const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Entry = require('../../models/Entry');

/**
 * @route   GET api/entries
 * @desc    Get all entries from a specific user
 * @access  Private
 */

router.get('/', auth, (req, res) => {
  // TODO: add possibility to filter (certain date/month or mood)
  Entry.find({ user: req.user.sub })
    .sort({ date: -1 })
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      res.status(500).json(err);
    });
});

/**
 * @route   POST api/entries
 * @desc    Add a new entry
 * @access  Private
 */

router.post('/', auth, (req, res) => {
  // TODO: add categories to add
  const newEntry = new Entry({
    user: req.user.sub,
    comment: req.body.comment,
    mood: req.body.mood,
  });

  newEntry
    .save()
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
