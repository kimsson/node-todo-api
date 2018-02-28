module.exports = (function() {
  var router = require('express').Router();
  var { authenticate } = require('../middleware/authenticate');
  var { Todo } = require('../models/todo');

  const { ObjectID } = require('mongodb');
  const _ = require('lodash');

  router.route('/').post(postTodos);
  router.route('/').get(getTodos);
  router.route('/:id').get(getTodosId);
  router.route('/:id').delete(deleteTodo);
  router.route('/:id').patch(updateTodo);

  function postTodos (req, res) {
    var todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    })

    todo.save().then((doc) => {
      res.send({
        doc
      });
    }, (e) => {
      res.status(400).send(e)
    })
  }

  function getTodos (req, res) {
    Todo.find({
      _creator: req.user._id
    }).then((todos) => {
      res.send({
        todos,
      });
    }, (e) => {
      res.status(400).send(e);
    })
  }
  function getTodosId (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findOne({
      _id: req.params.id,
      _creator: req.user._id
    }).then((todo) => {
      if (!todo) {
        res.status(404).send();
      }
      res.status(200).send({
        todo
      })
    }).catch((e) => {
      res.status(400).send();
    })
  }
  function deleteTodo (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    Todo.findOneAndRemove({
      _id: req.params.id,
      _creator: req.user._id
    }).then((todo) => {
      if(!todo){
        res.status(404).send();
      }
      res.status(200).send({
        todo
      });
    }).catch((e) => {
      res.status(400).send();
    })
  }
  function updateTodo (req, res) {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(req.params.id, {
      $set: body
    }, {
      new: true
    }).then((todo) => {
      if(!todo) {
        res.status(404).send();
      }
      res.send({
        todo
      })
    }).catch((e) => {
      res.status(400).send();
    })
  }
  return router;

})();
