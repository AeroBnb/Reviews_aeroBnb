// var mongoose = require('mongoose');
// var db = require('../../../database/mongoDB/mongoDB')

// var listingSchema = mongoose.Schema({
//   l_id: Number,
//   reviews: {
//     review_date: Date,
//     reviews: String,
//     users:{
//       accuracy: Number,
//       communication: Number,
//       cleanliness: Number,
//       location: Number,
//       check_in: Number,
//       value: Number,
//       username: String,
//       display_name: String,
//       photo_url: String,
//     },
//     total_score: String,
//     total_reviews: Number,
//     top_twentyFive: Array
//   }
// }, {collection: 'Listings'});


// var listingSchema = mongoose.Schema({
//   id: {type: Number, index: true},
//   reviews: Object,
//   avg_score: Object,
//   total_reviews: Number,
//   top_Five: Array,
// }, {collection: 'Listings'});

  
  // var userSchema = mongoose.Schema({
  //   id: Number,
  //   profile_url: String,
  // });
  
  // var reviewSchema = mongoose.Schema({
  //   r_id: Number,
  //   user_id: Number,
  // });


  // var Reviews = mongoose.model('Reviews', reviewSchema);
  // var Users = mongoose.model('Users', userSchema);
  // var Listings = mongoose.model('Listings', listingSchema);

  // Listings.find({id:99979})
  //   .exec(function(err, data) {
  //     if(err) {
  //       console.log('error');
  //     } else {
  //       console.log(data);
  //     }
  //   });

  


  // module.exports = {Listings, db};