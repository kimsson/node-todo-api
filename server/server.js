
const config = require('./config/config');

var express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
//Routes
var router = express.Router();

var todoController = require('./routes/todoController');
var userController = require('./routes/userController');

app.use('/', router);
app.use('/todos', authenticate);
app.use('/todos', todoController);

app.use('/users/me', authenticate);
app.use('/users', userController);

// app.post('/todos', authenticate, (req, res) => {
//   var todo = new Todo({
//     text: req.body.text,
//     _creator: req.user._id
//   })
//
//   todo.save().then((doc) => {
//     res.send({
//       doc
//     });
//   }, (e) => {
//     res.status(400).send(e)
//   })
// })
// app.get('/todos', authenticate, (req, res) => {
//   Todo.find({
//     _creator: req.user._id
//   }).then((todos) => {
//     res.send({
//       todos,
//     });
//   }, (e) => {
//     res.status(400).send(e);
//   })
// })
// app.get('/todos/:id',authenticate, (req, res) => {
//   var id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   Todo.findOne({
//     _id: req.params.id,
//     _creator: req.user._id
//   }).then((todo) => {
//     if (!todo) {
//       res.status(404).send();
//     }
//     res.status(200).send({
//       todo
//     })
//   }).catch((e) => {
//     res.status(400).send();
//   })
// })
// app.delete('/todos/:id',authenticate, (req, res) => {
//   var id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//   Todo.findOneAndRemove({
//     _id: req.params.id,
//     _creator: req.user._id
//   }).then((todo) => {
//     if(!todo){
//       res.status(404).send();
//     }
//     res.status(200).send({
//       todo
//     });
//   }).catch((e) => {
//     res.status(400).send();
//   })
// })
//
// app.patch('/todos/:id', (req, res) => {
//   var id = req.params.id;
//   var body = _.pick(req.body, ['text', 'completed']);
//
//   console.log(body);
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   if(_.isBoolean(body.completed) && body.completed) {
//     body.completedAt = new Date().getTime();
//   } else {
//     body.completed = false;
//     body.completedAt = null;
//   }
//
//   Todo.findByIdAndUpdate(req.params.id, {
//     $set: body
//   }, {
//     new: true
//   }).then((todo) => {
//     if(!todo) {
//       res.status(404).send();
//     }
//     res.send({
//       todo
//     })
//   }).catch((e) => {
//     res.status(400).send();
//   })
// })

// app.post('/users', (req, res) => {
//   var body = _.pick(req.body, ['email', 'password']);
//   var user = new User(body);
//
//   user.save().then(() => {
//     return user.generateAuthToken();
//   }).then((token) => {
//     res.header('x-auth', token).send(user);
//   }).catch((e) => {
//     res.status(400).send(e);
//   })
// })
//
// app.get('/users', (req, res) => {
//   User.find({}).then((users) => {
//     res.send({
//       users,
//     });
//   }, (e) => {
//     res.status(400).send(e);
//   })
// });
//
// app.get('/users/me', authenticate, (req, res) => {
//   res.send(req.user)
// });
//
// app.post('/users/login', (req, res) => {
//   var body = _.pick(req.body, ['email', 'password']);
//   User.findByCredentials(body.email, body.password).then((user) => {
//     user.generateAuthToken().then((token) => {
//       res.header('x-auth', token).send(user);
//     })
//   }).catch((e) => {
//     res.status(400).send(e);
//   })
// })
//
// app.delete('/users/me/token', authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send();
//   }, () => {
//     res.status(400).send();
//   });
// });

app.listen(port, () => {
  console.log(`Started port on ${port}`);
})

module.exports = {app};
