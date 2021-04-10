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
  Entry.find({ user: req.user._id })
    .sort({ date: -1 })
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      res.status(500).send(err.toString());
    });
});

/**
 * @route   POST api/entries
 * @desc    Add a new entry
 * @access  Private
 */

router.post('/', auth, (req, res) => {
  const newEntry = new Entry({
    user: req.user._id,
    comment: req.body.comment,
    mood: req.body.mood,
    date: req.body.date,
    activities: req.body.activities,
  });

  newEntry
    .save()
    .then((item) => res.status(200).json(item))
    .catch((err) => res.status(400).send(err.toString()));
});

/**
 * @route   PATCH api/entries/:id
 * @desc    Updates an existing entry
 * @access  Private
 */

router.patch('/:id', auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      throw Error('Entry could not be found');
    }
    if (!req.user._id.equals(entry.user)) {
      throw Error('User has no permission to change this entry');
    }

    entry.date = req.body.date;
    entry.mood = req.body.mood;
    entry.comment = req.body.comment;
    entry.activities = req.body.activities;

    const updatedEntry = await entry.save();
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json(error.toString());
  }
});

/**
 * @route   DELETE api/entries/:id
 * @desc    Deletes an entry
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      throw Error('Entry does not exist');
    }
    if (!req.user._id.equals(entry.user)) {
      throw Error('User has no permission to delete this entry');
    }

    if (!(await entry.remove())) {
      throw Error('Entry could not be deleted');
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

module.exports = router;
