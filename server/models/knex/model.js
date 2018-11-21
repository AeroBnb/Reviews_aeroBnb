const knex = require('../../../database/postgres/index.js')

module.exports = {
  getAllReviews: (listingId) => {
    console.log("Hello");
    return knex.raw(`SELECT *
    FROM Reviews
    LEFT JOIN Users
    ON Reviews.user_id = Users.id
    WHERE Reviews.listings_id = ${listingId}
    ORDER BY Reviews.review_date DESC;
    `); 
  },

  getRatings: (listingId) => {  // update
    return knex.raw(`SELECT 
      AVG(accuracy) AS accuracy, 
      AVG(communication) AS communication, 
      AVG(cleanliness) AS cleanliness, 
      AVG(location) AS location, 
      AVG(checkin) AS checkin, 
      AVG(value) AS value
      FROM reviews
      INNER JOIN bookings
      ON (reviews.booking_id = bookings.b_id AND bookings.listing_id = ?);
    `, (listingId));
  },

  getSearch: (listingId, query) => {  // NOT WORKING
    return knex.raw(`SELECT *
      FROM reviews
      INNER JOIN Bookings
      ON 
        (reviews.booking_id = bookings.b_id 
        AND bookings.listing_id = ? 
        AND reviews.review_text LIKE ?)
      INNER JOIN Users
      ON (bookings.user_id = users.u_id)
      ORDER BY Reviews.review_date DESC;
    `, (listingId, `${query}`));
  },

  postReview: (options) => { // update
    let orderedOptions = [
      options.bookingId || Math.floor(Math.random() * 15000000),
      new Date().toISOString().slice(0,10),
      options.reviewText, 
      options.accuracy || null,
      options.communication || null, 
      options.cleanliness || null, 
      options.location || null, 
      options.checkin || null, 
      options.value || null
    ];
    return knex.raw(`
      INSERT into reviews 
        (booking_id, review_date, review_text, accuracy, 
        communication, cleanliness, location, checkin, value)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, (orderedOptions));
  },

  editReview: (reviewId, newReviewText, callback) => { // update
    return knex.raw(`
      UPDATE reviews SET review_text = ?
      WHERE r_id = ?;
    `, [newReviewText, reviewId]);
  },

  deleteReview: (reviewId, callback) => { // update
    return knex.raw(`DELETE FROM reviews 
      WHERE r_id = ?
    `, [reviewId]);
  }
};