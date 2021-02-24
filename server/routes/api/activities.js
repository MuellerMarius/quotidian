const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');
const UserActivities = require('../../models/UserActivities');
const ActivityCategory = require('../../models/ActivityCategory');
const Activity = require('../../models/Activity');

/**
 * @route   GET api/activities
 * @desc    Get all activites and categories from a specific user
 * @access  Private
 */

router.get('/', auth, (req, res) => {
  UserActivities.findOne({ user: req.user.sub })
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
    { user: req.user.sub },
    { $push: { categories: newCategory } },
    { upsert: true }
  )
    .then(() => res.status(200).json(newCategory))
    .catch((err) => res.status(400).json(err));
});

/**
 * @route   PATCH api/activities/category
 * @desc    Rename a category
 * @access  Private
 */

router.patch('/category', auth, async (req, res) => {
  try {
    const userData = await UserActivities.findOne({ user: req.user.sub });
    if (!userData) {
      throw Error('User does not exist');
    }

    const category = userData.categories.id(req.body._id);
    if (!category) {
      throw Error('Category does not exist');
    }

    category.name = req.body.name;

    await userData
      .save()
      .then((item) => res.status(200).json(category))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(400).json({ msg: error.message, success: false });
  }
});

/**
 * @route   DELETE api/activities/category
 * @desc    Delete a category and remove it from all entries
 * @access  Private
 */

// TODO: remove all activities from entries
router.delete('/category', auth, (req, res) => {
  UserActivities.updateOne(
    {
      user: req.user.sub,
    },
    {
      $pull: { categories: { _id: req.body.cat_id } },
    }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
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
      user: req.user.sub,
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
    .catch((err) => res.status(400).json(err));
});

// TODO: delete & rename & move Activities
/**
 * @route   PATCH api/activities
 * @desc    Change an existing activity
 * @access  Private
 */

router.patch('/', auth, (req, res) => {
  //   const newActivity = new Activity({
  //     _id: mongoose.Types.ObjectId(),
  //     name: req.body.name,
  //     icon: req.body.icon,
  //   });
  //   UserActivities.updateOne(
  //     {
  //       user: req.user.sub,
  //       categories: { $elemMatch: { _id: req.body.cat_id } },
  //     },
  //     {
  //       $push: {
  //         'categories.$.activities': newActivity,
  //       },
  //     },
  //     { upsert: true }
  //   )
  //     .then(() => res.status(200).json(newActivity))
  //     .catch((err) => res.status(400).json(err));
  //     UserActivities.updateOne(
  //         {
  //           user: req.user.sub,
  //           categories: { $elemMatch: { _id: req.body.cat_id } },
  //         },
  //         { $set: { 'categories.$.name': req.body.name } }
  //       )
  //         .then((data) => res.status(200).json(data))
  //         .catch((err) => res.status(400).json(err));
});
module.exports = router;
