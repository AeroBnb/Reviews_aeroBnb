var mongoose = require('mongoose');
// var data = require('../server/models/seed.js')
var { username, password } = require('../config.js')


if(process.env.MLAB_URI) {
  mongoose.connect(process.env.MLAB_URI)
} else {
  mongoose.connect('mongodb://localhost/SDC');
}

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  // seedDatabase();
  console.log('mongoose connected successfully');
});




module.exports = {db};