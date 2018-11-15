const db = require('../../../database/index.js');
const mongoDB = require('../../../database/mongoDB.js');
const {Listings} = require('./model.js');
// const {Users} = require('./model.js');

const postgres = require('../../../database/postgres.js');

module.exports = {
  // getAllReviews: (listingID, callback) => {
  //   const SQLquery = `SELECT *
  //   FROM Reviews
  //   INNER JOIN Bookings
  //   ON Reviews.bookings_id = Bookings.b_id
  //   LEFT JOIN Users
  //   ON Bookings.users_id = Users.u_id
  //   WHERE Bookings.listings_id = ${listingID}
  //   ORDER BY Reviews.review_date DESC;`;
  //   db.query(SQLquery, (error, response) => {
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       callback(response);
  //     }
  //   });
  // },

  getAllReviews: (listingID, callback) => {
    var start = Date.now();
    Listings.findOne({id: listingID})
      //.sort({"review.review_date": -1})
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
    let SQLquery = `SELECT AVG(accuracy) AS accuracy, AVG(communication) AS communication, AVG(cleanliness) as cleanliness, AVG(\`location\`) as location, AVG(\`check-in\`) as checkin, AVG(\`value\`) as value
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.bookings_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.users_id = Users.u_id
    WHERE Bookings.listings_id = ${listingID};`;
    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },
  // getRatings: () => {

  // },

  search: (listingID, query, callback) => {
    const SQLquery = `SELECT *
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.bookings_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.users_id = Users.u_id
    WHERE Bookings.listings_id = ${listingID}
    AND Reviews.review LIKE "${query}"
    ORDER BY Reviews.review_date DESC;`;

    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },
};
