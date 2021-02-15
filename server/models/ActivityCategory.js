const mongoose = require('mongoose');
const ActivitySchema = require('./Activity').schema;

const ActivityCategorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  activities: [ActivitySchema],
});

module.exports = mongoose.model('ActivityCategory', ActivityCategorySchema);
