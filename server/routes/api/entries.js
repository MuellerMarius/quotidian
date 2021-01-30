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
    date: req.body.date,
  });

  newEntry
    .save()
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(400).json(err));
});

/**
 * @route   PATCH api/entries/:id
 * @desc    Updates an existing entry
 * @access  Private
 */

router.patch('/:id', auth, async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (entry) {
    entry.date = req.body.date;
    entry.mood = req.body.mood;
    entry.comment = req.body.comment;
  }

  const updatedEntry = await entry
    .save()
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(400).json(err));
});

/**
 * @route   DELETE api/entries/:id
 * @desc    Deletes an entry
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry || entry.user !== req.user.sub) {
      throw Error('Entry does not exist');
    }

    const removed = await entry.remove();
    if (!removed) {
      throw Error('Entry could not be deleted');
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
