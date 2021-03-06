const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');
const UserActivities = require('../../models/UserActivities');
const ActivityCategory = require('../../models/ActivityCategory');
const Activity = require('../../models/Activity');
const Entry = require('../../models/Entry');

/**
 * @route   GET api/activities
 * @desc    Get all activites and categories from a specific user
 * @access  Private
 */

router.get('/', auth, (req, res) => {
  UserActivities.findOne({ user: req.user._id })
    .then((result) => {
      res.status(200).json(result.categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/**
 * @route   POST api/activities/category
 * @desc    Add a new category
 * @access  Private
 */

router.post('/category', auth, (req, res) => {
  const newCategory = new ActivityCategory({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    activities: req.body.activities,
  });

  UserActivities.updateOne(
    { user: req.user._id },
    { $push: { categories: newCategory } },
    { upsert: true }
  )
    .then(() => res.status(200).json(newCategory))
    .catch((err) => res.status(400).send(err.toString()));
});

/**
 * @route   PATCH api/activities/category
 * @desc    Rename a category
 * @access  Private
 */

router.patch('/category', auth, async (req, res) => {
  try {
    const userData = await UserActivities.findOne({ user: req.user._id });
    if (!userData) {
      throw Error('User does not exist');
    }

    const category = userData.categories.id(req.body._id);
    if (!category) {
      throw Error('Category does not exist');
    }

    category.name = req.body.name;

    await userData.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

/**
 * @route   DELETE api/activities/category
 * @desc    Delete a category and remove it from all entries
 * @access  Private
 */

router.delete('/category', auth, async (req, res) => {
  try {
    const userData = await UserActivities.findOne({ user: req.user._id });
    if (!userData) {
      throw Error('User does not exist');
    }

    const category = userData.categories.id(req.body._id);
    if (!category) {
      throw Error('Category does not exist');
    }

    // remove ids from all entries
    const ids = category.activities.map((act) => act._id);
    await Entry.updateMany(
      { user: req.user._id },
      { $pullAll: { activities: ids } }
    );

    if (!(await category.remove())) {
      throw Error('Category could not be removed');
    }

    const updatedData = await userData.save();
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

/**
 * @route   POST api/activities
 * @desc    Add a new activity
 * @access  Private
 */

router.post('/', auth, (req, res) => {
  const newActivity = new Activity({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    icon: req.body.icon,
  });

  UserActivities.updateOne(
    {
      user: req.user._id,
      categories: { $elemMatch: { _id: req.body.parentCatId } },
    },
    {
      $push: {
        'categories.$.activities': newActivity,
      },
    },
    { upsert: true }
  )
    .then(() => res.status(200).json(newActivity))
    .catch((err) => res.status(400).send(err.toString()));
});

/**
 * @route   PATCH api/activities
 * @desc    Change an existing activity
 * @access  Private
 */

router.patch('/', auth, async (req, res) => {
  try {
    const userData = await UserActivities.findOne({ user: req.user._id });
    if (!userData) {
      throw Error('User does not exist');
    }

    const category = userData.categories.id(req.body.parentCatId);
    if (!category) {
      throw Error('Category does not exist');
    }

    const activity = category.activities.id(req.body._id);
    if (!activity) {
      throw Error('Activity does not exist');
    }

    activity.name = req.body.name;
    activity.icon = req.body.icon;

    await userData.save();
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

/**
 * @route   DELETE api/activities
 * @desc    Delete an existing activity
 * @access  Private
 */

router.delete('/', auth, async (req, res) => {
  try {
    const userData = await UserActivities.findOne({ user: req.user._id });
    if (!userData) {
      throw Error('User does not exist');
    }

    const category = userData.categories.id(req.body.parentCatId);
    if (!category) {
      throw Error('Category does not exist');
    }

    const activity = category.activities.id(req.body._id);
    if (!activity) {
      throw Error('Activity does not exist');
    }

    // remove ids from all entries
    await Entry.updateMany(
      { user: req.user._id },
      { $pull: { activities: activity._id } }
    );

    if (!(await activity.remove())) {
      throw Error('Category could not be removed');
    }

    await userData.save();
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

module.exports = router;
