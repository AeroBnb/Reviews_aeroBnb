var mongoose = require('mongoose');
// var data = require('../server/models/seed.js')


// if(process.env.MLAB_URI) {
//   mongoose.connect(process.env.MLAB_URI)
// } else {
//   mongoose.connect('mongodb://142.93.4.86:27017');
// }

mongoose.connect('mongodb://localhost/SDCupdated');
  

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});


db.once('open', function() {
  // seedDatabase();
  console.log('mongoose connected successfully to database SDCupdated');
});






module.exports = {db};