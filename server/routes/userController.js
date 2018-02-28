module.exports = (function() {
  var router = require('express').Router();
  var { authenticate } = require('../middleware/authenticate');
  var { User } = require('../models/user');

  const { ObjectID } = require('mongodb');
  const _ = require('lodash');

  router.route('/').post(postUser);
  router.route('/').get(getUser);
  router.route('/me').get(getUserMe);
  router.route('/login').post(userlogin);
  router.route('/me/token').delete(deleteUser);


  function postUser (req, res) {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  }
  function getUser (req, res) {
    User.find({}).then((users) => {
      res.send({
        users,
      });
    }, (e) => {
      res.status(400).send(e);
    })
  }

  function getUserMe (req, res) {
    res.send(req.user)
  }

  function userlogin (req, res) {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
      user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      })
    }).catch((e) => {
      res.status(400).send(e);
    })
  }

  function deleteUser (req, res) {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
  }
  return router;

})();
