// const db = require('../../../database/mySQL/index');
const db = require('../../../database/mongoDB/mongoDB');
const {Listings} = require('./model.js');
// const {Users} = require('./model.js');

const postgres = require('../../../database/sequelize/postgres');

module.exports = {
  getAllReviews: (listingID, callback) => {
    var start = Date.now();
    db.Listings.findOne({id: listingID})
      .exec(function(err, data) {
        if(err) {
          console.log('error: ', err);
        } else {
          var reviews = Object.values(data.reviews);
          // console.log(reviews);
          callback(reviews);
          console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
        }
      });
  },
 
  getRatings: (listingID, callback) => {
    var start = Date.now();
    db.Listings.findOne({id: listingID}).select('avg_score -_id')
      .exec(function(err, data) {
        if(err) {
          console.log('error');
        } else {
          callback([data.avg_score]);
          console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
        }
      });

  },

  search: (listingID, query, callback) => {
    var start = Date.now();
    db.Listings.findOne({id: listingID, reviews: new RegExp(`^ ${query}$`, "i")})
      .exec(function(err, data) {
        if(err) {
          console.log('error');
        } else {
          callback(data);
          console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
        }
      });

  },

  postReviews: (listingID, body, callback) => {
    var start = Date.now();
    var obj = {
      review_date: body.review_date,
      reviews: body.reviews,
      accuracy: body.accuracy,
      communication: body.communication,
      cleanliness: body.cleanliness,
      location: body.location,
      check_in: body.check_in,
      value: body.value,
      display_name: body.display_name,
      photo_url: body.photo_url
    }
    db.Listings.update({id: listingID, "config.id": {"$eq": listingID}}, {"$push": {reviews: {obj}}})
      // Listings.update({id: listingID}, {reviews: {obj}}, {upsert: true})
      .exec(function(err, data) {
        if(err) {
          console.log('error', err);
        } else {
          console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
        }
      });

  },

  updateReviews: (listingID, body, callback) => {
    var start = Date.now();
    var obj = {
      review_date: body.review_date,
      reviews: body.reviews,
      accuracy: body.accuracy,
      communication: body.communication,
      cleanliness: body.cleanliness,
      location: body.location,
      check_in: body.check_in,
      value: body.value,
      display_name: body.display_name,
      photo_url: body.photo_url
    }
    // Listings.update({id: listingID}, {$addToSet: {reviews: body.reviews}})
      db.Listings.update({id: listingID}, {reviews: {obj}}, {upsert: true})
      .exec(function(err, data) {
        if(err) {
          console.log('error', err);
        } else {
          console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
        }
      });
  },

  deleteReviews: (listingID, query, callback) => {
    var start = Date.now();
    db.Listings.update({id: listingID, username: query.display_name}, {"$unset": {reviews: {display_name: {}}} })
      .exec(function(err, data) {
        if(err) {
          console.log('error');
        } else {
          callback(data);
          console.log((Date.now() - start) / 1000);
        }
      });
  }
};
