const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

Todo.remove({}).then((result) => {
  console.log(result);
})

Todo.findByIdAndRemove('5a859d47a0304d1400557d0d').then((todo) => {
  console.log('Todo ', todo);
})
