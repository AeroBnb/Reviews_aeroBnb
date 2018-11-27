const knex = require('../../../database/postgres/index.js');

const start = Date.now();

module.exports = {
  getAllReviews: (listingId, callback) => {
    console.log("Hello");
    // knex.select().from('reviews').where({r_id: 1})
    // .then(result => {
		// 	console.log('ia ma in the knex connection ', result);

		// });

    knex.raw(`SELECT *
    FROM Reviews
    LEFT JOIN Users
    ON Reviews.user_id = Users.id
    WHERE Reviews.listings_id = ${listingId}
    ORDER BY Reviews.review_date DESC;
    `).then((result, error) => {
      if(error) console.error(error);
      callback(result.rows);
      console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
    })
  },

  getRatings: (listingID, callback) => {
    console.log('I am in the ratings');
    let SQLquery = `SELECT AVG(accuracy) AS accuracy, AVG(communication) AS communication, AVG(cleanliness) as cleanliness, AVG(location) as location, AVG(check_in) as checkin, AVG(value) as value
    FROM Reviews
    LEFT JOIN Users
    ON Reviews.user_id = Users.id
    WHERE Reviews.listings_id = ${listingID};`;
    var start = Date.now();
    knex.raw(SQLquery)
    .then ((response, error) => {
      if (error) {
        console.error(error);
      } else {
        callback(response.rows);
        console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
      }
    });
  },

  search: (listingId, query) => {  // NOT WORKING
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

  // postReview: (options) => { // update
  //   let orderedOptions = [
  //     options.bookingId || Math.floor(Math.random() * 15000000),
  //     new Date().toISOString().slice(0,10),
  //     options.reviewText, 
  //     options.accuracy || null,
  //     options.communication || null, 
  //     options.cleanliness || null, 
  //     options.location || null, 
  //     options.checkin || null, 
  //     options.value || null
  //   ];
  //   return knex.raw(`
  //     INSERT into reviews 
  //       (booking_id, review_date, review_text, accuracy, 
  //       communication, cleanliness, location, checkin, value)
  //     VALUES
  //       (?, ?, ?, ?, ?, ?, ?, ?, ?)
  //   `, (orderedOptions));
  // },


  postReviews: (listingID, body, callback) => {

    var passedValues = {
      listings_id: parseInt(listingID),
      user_id: body.user_id || Math.floor(Math.random() * 10000000),
      review_date: new Date().toISOString().slice(0,10),
      reviews: body.reviews,
      accuracy: body.accuracy || null,
      communication: body.communication || null, 
      cleanliness: body.cleanliness || null, 
      location: body.location || null, 
      check_in: body.check_in || null, 
      value: body.value || null,
    }
    var user = {
      username: body.username,
      display_name: body.display_name,
      photo_url: body.photo_url,
      profile_url: body.profile_url
    }

    // const SQLquery = `INSERT INTO Reviews (listings_id, user_id, review_date, reviews, accuracy, communication, cleanliness, location, check_in, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    var start = Date.now();
    // postgres.db.query(`INSERT INTO Reviews 
    // (listings_id, user_id, review_date, reviews, accuracy, 
    // communication, cleanliness, location, check_in, value) 
    // VALUES 
    // (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, (passedValues))
    knex('reviews').insert(passedValues)
      .then((response, error) => {
        if (error) {
          console.error(error);
        } else {
          callback(response);
          console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
        }
      });
    knex('users').insert(user)
    .then((response, error) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
        console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
      }
    });

  },

  updateReviews: (reviewId, newReviewText, callback) => { // update
    return knex.raw(`
      UPDATE reviews SET review_text = ?
      WHERE r_id = ?;
    `, [newReviewText, reviewId]);
  },

  deleteReviews: (reviewId, callback) => { // update
    return knex.raw(`DELETE FROM reviews 
      WHERE r_id = ?
    `, [reviewId]);
  }
};