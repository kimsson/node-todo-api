var mongoose = require('mongoose');
var Sensor = mongoose.model('Sensor', {
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

module.exports = { Sensor };
