const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var id = '5a8450b7b102de793a2d43a7';

if(!ObjectID.isValid(id)) {
  console.log('Id not valid');
}

User.findById(id).then((user) => {
  if (!user) {
    return console.log('Unable to find user.');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos ', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo ', todo);
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found.');
//   }
//   console.log('Todo by id ', todo);
// }).catch((e) => console.log(e));
