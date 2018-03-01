var mongoose = require('mongoose');
var PlantLog = mongoose.model('PlantLog', {
  sensors: [{
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
    }
  }],
  switches: [{
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
    }
  }],
  createdAt: {
    type: Number,
    required: true
  }
});

module.exports = {PlantLog};
