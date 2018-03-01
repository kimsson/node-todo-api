var mongoose = require('mongoose');
var Switch = mongoose.model('Switch', {
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
});

module.exports = { Switch };
