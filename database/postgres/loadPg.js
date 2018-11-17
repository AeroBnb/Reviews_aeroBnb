const knex = require('../postgres/index');

exports.insertReviewsPG = (reviewsArr) => {
  knex.batchInsert('SDC.reviews', reviewsArr, 625);
}

exports.insertBookingsPG = (bookingsArr) => {
  knex.batchInsert('SDC.bookings', bookingsArr, 625);
}

exports.insertListingsPG = (listingsArr) => {
  knex.batchInsert('SDC.listings', listingsArr, 625);
}

exports.insertUsersPG = (usersArr) => {
  knex.batchInsert('SDC.users', usersArr, 625);
}

exports.endPGconnection = () => {
  knex.destroy();
}