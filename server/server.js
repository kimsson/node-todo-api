
const config = require('./config/config');

var express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')
var cron = require('node-cron');
var Log = require('./services/plantLogService');

cron.schedule('0 */1 * * *', function () {
  console.log('running Log task');
  Log.log();
})
const port = process.env.PORT || 3000;

var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
//Routes
var router = express.Router();

var todoController = require('./routes/todoController');
var userController = require('./routes/userController');
var plantController = require('./routes/plantController');

app.use('/api/', router);
app.use('/api/todos', authenticate);
app.use('/api/todos', todoController);

app.use('/api/users/me', authenticate);
app.use('/api/users', userController);

app.use('/api/plant', plantController);

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
