const mongoose = require('mongoose');

mongoose.promise = global.Promise;

mongoose.connect('localhost:27017/TodoApp');

module.exports = {mongoose};
