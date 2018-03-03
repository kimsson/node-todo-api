const Firebase = require('../db/firebase');
const _ = require('lodash');
Firebase.init()

var { Sensor } = require('../models/sensor');

const log = () => {
  Firebase.load('sensors/', (payload) => {
    var sensors = payload.val();
    if(sensors === null) return

    _.map(sensors, (sensor) => {
      var sensor = new Sensor({
        name: sensor.name,
        value: sensor.value,
        id: sensor.id,
        createdAt: new Date().getTime()
      });

      sensor.save().then((doc) => {
      }, (e) => {
        throw(e);
      });
      return sensor;
    })

  })

}

module.exports = { log };
