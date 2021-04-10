const mongoose = require('mongoose');
const ActivityCategorySchema = require('./ActivityCategory').schema;

const UserActivitySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  categories: [ActivityCategorySchema],
});

UserActivitySchema.statics.initialize = async function (id) {
  const newActSchema = new this({
    user: id,
    categories: [],
  });

  await newActSchema.save();
};

module.exports = mongoose.model(
  'UserActivityCategory',
  UserActivitySchema,
  'activities'
);
