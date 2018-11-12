var mongoose = require('mongoose');
var db = require('../../../database/mongoDB.js')

var listingSchema = mongoose.Schema({
    l_id: Number,
    address: String,
  });
  
  var userSchema = mongoose.Schema({
    id: Number,
    username: String,
    display_name: String,
    photo_url: String,
    profile_url: String,
  });
  
  var reviewSchema = mongoose.Schema({
    r_id: Number,
    user_id: Number,
    review_date: Date,
    reviews: String,
    accuracy: Number,
    communication: Number,
    cleanliness: Number,
    location: Number,
    check_in: Number,
    value: Number,
  });


  var Reviews = mongoose.model('Reviews', reviewSchema);
  var Users = mongoose.model('Users', userSchema);
  var Listings = mongoose.model('Listings', listingSchema);


  module.exports = {Reviews, Users, Listings, db};