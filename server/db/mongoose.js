const mongoose = require('mongoose');


mongoose.promise = global.Promise;

mongoose.connect(process.env.MONGOODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };
