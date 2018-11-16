const db = require('../../../database/index.js');
// const mongoDB = require('../database/mongoDB.js');
const {Users, Listings, Reviews} = require('./models.js')
const postgres = require('../../../database/postgres/postgres');

module.exports = {
  getAllReviews: (listingID, callback) => {
    // const SQLquery = `SELECT *
    // FROM Reviews
    // INNER JOIN Users
    // ON Reviews.user_id = Users.id
    // WHERE Reviews.listings_id = ${listingID}
    // ORDER BY Reviews.review_date DESC;`;
    // postgres.db.query(SQLquery, (error, response) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log(response);
    //     callback(response);
    //   }
    // });
    Reviews.findOne({r_id: 2}).then(review => {
      console.log(review);
    })
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
