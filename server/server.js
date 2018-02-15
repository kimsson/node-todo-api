
const config = require('./config/config');

var express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send({
      code: 'Todo added',
      doc
    });
  }, (e) => {
    res.status(400).send(e)
  })
})
app.get('/todos', (req, res) => {
  Todo.find({}).then((todos) => {
    res.send({
      code: 'Available todos',
      todos,
    });
  }, (e) => {
    res.status(400).send(e);
  })
})
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(req.params.id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.status(200).send({
      code: 'Todo found',
      todo
    })
  }).catch((e) => {
    res.status(400).send();
  })
})
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(req.params.id).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.status(200).send({
      code: 'Todo deleted',
      todo
    });
  }).catch((e) => {
    res.status(400).send();
  })
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  console.log(body);
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
      code: 'Todo updated',
      todo
    })
  }).catch((e) => {
    res.status(400).send();
  })
})

app.listen(port, () => {
  console.log(`Started port on ${port}`);
})

module.exports = {app};
