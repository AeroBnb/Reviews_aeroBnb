//------------- mySQl model file -------------------//

const db = require('../database/mySQL/index.js');


module.exports = {
  getAllReviews: (listingID, callback) => {
    const SQLquery = `SELECT *
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.bookings_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.users_id = Users.u_id
    WHERE Bookings.listings_id = ${listingID}
    ORDER BY Reviews.review_date DESC;`;
    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
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

  search: (listingID, query, callback) => {
    const SQLquery = `SELECT *
    FROM Reviews
    INNER JOIN Bookings
    ON Reviews.bookings_id = Bookings.b_id
    LEFT JOIN Users
    ON Bookings.users_id = Users.u_id
    WHERE Bookings.listings_id = ${listingID}
    AND Reviews.reviews LIKE "${query}"
    ORDER BY Reviews.review_date DESC;`;

    db.query(SQLquery, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
      }
    });
  },
  postReviews: (listing_id, options, callback) => {
    var query = [
      options.bookings_id || Math.floor(Math.random() * 15000000),
      new Date().toISOString().slice(0,10),
      options.reviews, 
      options.accuracy || null,
      options.communication || null, 
      options.cleanliness || null, 
      options.location || null, 
      options.check_in || null, 
      options.value || null
    ];
    db.query(`
      INSERT into Reviews 
        (bookings_id, review_date, reviews, accuracy, 
        communication, cleanliness, location, check_in, value)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, (query), (err, response) => {
      if (err) {
        console.error(err);
      } else {
        callback(response);
      }
    })
  },

  updateReview: (listingID, body, callback) => {
    var query = `UPDATE Reviews as r INNER JOIN Bookings as b 
    ON r.bookings_id = b.b_id
    LEFT JOIN Users as u 
    ON b.users_id = u.u_id 
    SET r.reviews = ?
    WHERE b.listings_id = ?;`
    db.query(query,[body.reviews, listingID], (err, response) => {
      if (err) {
        console.error(err);
      } else {
        callback(response);
      }
    })
  },

  deleteReviews: (reviewId, callback) => {
    var query = `DELETE r FROM Reviews as r INNER JOIN Bookings as b 
    ON r.bookings_id = b.b_id
    LEFT JOIN Users as u 
    ON b.users_id = u.u_id 
    WHERE b.listings_id = ?;`
    db.query(query, [reviewId], (err, response) => {
      if (err) {
        console.error(err);
      } else {
        callback(response);
      }
    });
  }
};

// module.exports = {
//   getAllReviews: (listingID, callback) => {
//     const SQLquery = `SELECT *
//     FROM Reviews
//     INNER JOIN Bookings
//     ON Reviews.bookings_id = Bookings.b_id
//     LEFT JOIN Users
//     ON Bookings.users_id = Users.u_id
//     WHERE Bookings.listings_id = ${listingID}
//     ORDER BY Reviews.review_date DESC;`;
//     db.query(SQLquery, (error, response) => {
//       if (error) {
//         console.error(error);
//       } else {
//         callback(response);
//       }
//     });
//   },

//   getRatings: (listingID, callback) => {
//     let SQLquery = `SELECT AVG(accuracy) AS accuracy, AVG(communication) AS communication, AVG(cleanliness) as cleanliness, AVG(\`location\`) as location, AVG(\`check-in\`) as checkin, AVG(\`value\`) as value
//     FROM Reviews
//     INNER JOIN Bookings
//     ON Reviews.bookings_id = Bookings.b_id
//     LEFT JOIN Users
//     ON Bookings.users_id = Users.u_id
//     WHERE Bookings.listings_id = ${listingID};`;
//     db.query(SQLquery, (error, response) => {
//       if (error) {
//         console.error(error);
//       } else {
//         callback(response);
//       }
//     });
//   },

//   search: (listingID, query, callback) => {
//     const SQLquery = `SELECT *
//     FROM Reviews
//     INNER JOIN Bookings
//     ON Reviews.bookings_id = Bookings.b_id
//     LEFT JOIN Users
//     ON Bookings.users_id = Users.u_id
//     WHERE Bookings.listings_id = ${listingID}
//     AND Reviews.review LIKE "${query}"
//     ORDER BY Reviews.review_date DESC;`;

//     db.query(SQLquery, (error, response) => {
//       if (error) {
//         console.error(error);
//       } else {
//         callback(response);
//       }
//     });
//   },
// };
