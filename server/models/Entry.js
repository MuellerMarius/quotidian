const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  comment: {
    type: String,
  },
  mood: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activities' }],
});

module.exports = mongoose.model('Entry', EntrySchema, 'entries');
