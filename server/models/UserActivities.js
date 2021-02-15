const mongoose = require('mongoose');
const ActivityCategorySchema = require('./ActivityCategory').schema;

const UserActivitySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  categories: [ActivityCategorySchema],
});

module.exports = mongoose.model(
  'UserActivityCategory',
  UserActivitySchema,
  'activities'
);
