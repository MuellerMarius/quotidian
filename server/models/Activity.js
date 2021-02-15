const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model('Activity', ActivitySchema);
