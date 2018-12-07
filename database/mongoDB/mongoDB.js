var mongoose = require('mongoose');
// var data = require('../server/models/seed.js')

// deployed database
if(process.env.mongoURL) {
  mongoose.connect(process.env.mongoURL)
} else {
  mongoose.connect('mongodb://18.237.108.253:27017/SDC', {poolSize: 10, autoIndex: false});
}


//  Local database
// mongoose.connect('mongodb://localhost/SDC');
  

var db = mongoose.connection;


db.on('error', function() {
  console.log('mongoose connection error');
});


db.once('open', function() {
  // seedDatabase();
  console.log('mongoose connected successfully to database SDC');
});

var listingSchema = mongoose.Schema({
    id: {type: Number, index: true},
    reviews: Object,
    avg_score: Object,
    total_reviews: Number,
    top_Five: Array,
  }, {collection: 'Listings'});

var Listings = mongoose.model('Listings', listingSchema);





module.exports = {db, Listings};