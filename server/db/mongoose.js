const mongoose = require('mongoose');


mongoose.promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };


// process.env.NODE_ENV === 'production'
// process.env.NODE_ENV === 'test'
