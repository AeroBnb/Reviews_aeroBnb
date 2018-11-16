const db = require('../../../database/index.js');
const mongoDB = require('../../../database/mongoDB.js');
const {Listings} = require('./model.js');
// const {Users} = require('./model.js');

const postgres = require('../../../database/postgres.js');

module.exports = {
  getAllReviews: (listingID, callback) => {
    var start = Date.now();
    Listings.findOne({id: listingID})
      .sort({"review.review_date": -1})
      .exec(function(err, data) {
        if(err) {
          console.log('error');
        } else {
          callback(data);
          console.log((Date.now() - start) / 1000);
        }
      });
  },
 
  getRatings: (listingID, callback) => {
    var start = Date.now();
    Listings.findOne({id: listingID}).select('avg_score -_id')
      .exec(function(err, data) {
        if(err) {
          console.log('error');
        } else {
          callback(data);
          console.log((Date.now() - start) / 1000);
        }
      });

  },

  search: (listingID, query, callback) => {
    var start = Date.now();
    Listings.findOne({id: listingID, reviews: new RegExp(`^ ${query}$`, "i")})
      .exec(function(err, data) {
        if(err) {
          console.log('error');
        } else {
          callback(data);
          console.log((Date.now() - start) / 1000);
        }
      });

  },

  postReviews: (listingID, body, callback) => {
    var start = Date.now();
    Listings.update({id: listingID}, {$addToSet: {reviews: body}})
      .exec(function(err, data) {
        if(err) {
          console.log('error');
        } else {
          console.log(data);
          console.log((Date.now() - start) / 1000);
        }
      });
    console.log('In the post Review')

  },

  updateReviews: (listingID, query, callback) => {
    // var start = Date.now();
    // Listings.findOne({id: listingID, reviews: new RegExp(`^ ${query}$`, "i")})
    //   .exec(function(err, data) {
    //     if(err) {
    //       console.log('error');
    //     } else {
    //       callback(data);
    //       console.log((Date.now() - start) / 1000);
    //     }
    //   });
    console.log('In the update Review')
  },

  deleteReviews: (listingID, query, callback) => {
    // var start = Date.now();
    // Listings.findOne({id: listingID, reviews: new RegExp(`^ ${query}$`, "i")})
    //   .exec(function(err, data) {
    //     if(err) {
    //       console.log('error');
    //     } else {
    //       callback(data);
    //       console.log((Date.now() - start) / 1000);
    //     }
    //   });
    console.log('In the delete Review');
  }



};
