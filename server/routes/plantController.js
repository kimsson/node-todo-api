module.exports = (function (){

  var router = require('express').Router();
  var { Sensor } = require('../models/sensor');
  var { Switch } = require('../models/switch');

  router.route('/sensors').post(postSensors);
  router.route('/sensors/:id').get(getSensorsById);
  // router.route('/switches').post(postSwitches);

  function getSensorsById(req, res) {
    Sensor.find({id:req.params.id}).then((doc) => {
      res.send({
        doc
      })
    }, (e) => {
      res.status(400).send(e);
    });
  }
  function postSensors(req, res) {
    console.log(req.body.sensors);
    Sensor.insertMany(req.body.sensors).then((doc) => {
      res.send({
        doc
      })
    }, (e) => {
      res.status(400).send(e);
    });
  }
  return router;
})()
