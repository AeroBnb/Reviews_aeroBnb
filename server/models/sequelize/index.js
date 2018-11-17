const db = require('../../../database/mySQL/index.js');
// const mongoDB = require('../database/mongoDB.js');
const {Users, Listings, Reviews} = require('./models.js')
const postgres = require('../../../database/sequelize/postgres');
const Op = postgres.db.Op;


module.exports = {
  getAllReviews: (listingID, callback) => {
    const SQLquery = `SELECT *
    FROM Reviews
    LEFT JOIN Users
    ON Reviews.user_id = Users.id
    WHERE Reviews.listings_id = ${listingID}
    ORDER BY Reviews.review_date DESC;`;
    var start = Date.now();
    postgres.db.query(SQLquery).then((response, error) => {
      // Each record will now be a instance of Project
      if (error) {
        console.error(error);
      } else {
        callback(response);
        console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
      }
    });
    // Reviews.findOne({
    //   where: {listings_id: listingID}}).then(review => {
    //   console.log(review);
    //   callback(review);
    // })
  },

  getRatings: (listingID, callback) => {
    let SQLquery = `SELECT AVG(accuracy) AS accuracy, AVG(communication) AS communication, AVG(cleanliness) as cleanliness, AVG(location) as location, AVG(check_in) as checkin, AVG(value) as value
    FROM Reviews
    LEFT JOIN Users
    ON Reviews.user_id = Users.id
    WHERE Reviews.listings_id = ${listingID};`;
    var start = Date.now();
    postgres.db.query(SQLquery)
    .then ((response, error) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
        console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
      }
    });
  },

  search: (listingID, query, callback) => {
    const SQLquery = `SELECT *
    FROM Reviews
    LEFT JOIN Users
    ON Reviews.user_id = Users.id
    WHERE Reviews.listings_id = ${listingID}
    AND Reviews.reviews LIKE "${query}"
    ORDER BY Reviews.review_date DESC;`;
    var start = Date.now();
    postgres.db.query(SQLquery)
    .then((response, error) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
        console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
      }
    });
  },

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
      user_id: body.user_id,
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
    Reviews
    .build(passedValues)
    .save()
    .then((response, error) => {
      if (error) {
        console.error(error);
      } else {
        callback(response);
        console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
      }
    });

    // Users
    // .build(user)
    // .save()
    // .then((response, error) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     callback(response);
    //     console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
    //   }
    // });

  },

  updateReviews: (listingID, req, callback) => {

    Reviews.update(
      {reviews: req.reviews},
      {where: {r_id: listingID}}
    )
    .then(function(rowsUpdated, error) {
      if(error) {
        console.log('error: ', error);
      }
      res.json(rowsUpdated)
    })
    // const SQLquery = `SELECT *
    // FROM Reviews
    // LEFT JOIN Users
    // ON Reviews.user_id = Users.id
    // WHERE Reviews.listings_id = ${listingID}
    // AND Reviews.reviews LIKE "${query}"
    // ORDER BY Reviews.review_date DESC;`;
    // var start = Date.now();
    // postgres.db.query(SQLquery)
    // .then((response, error) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     callback(response);
    //     console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
    //   }
    // });
  },

  deleteReviews: (listingID, query, callback) => {
  //   const SQLquery = `SELECT *
  //   FROM Reviews
  //   LEFT JOIN Users
  //   ON Reviews.user_id = Users.id
  //   WHERE Reviews.listings_id = ${listingID}
  //   AND Reviews.reviews LIKE "${query}"
  //   ORDER BY Reviews.review_date DESC;`;
  //   var start = Date.now();
  //   postgres.db.query(SQLquery)
  //   .then((response, error) => {
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       callback(response);
  //       console.log(`Your Query took: , ${(Date.now() - start) / 1000} secs`);
  //     }
  //   });

    Reviews.findOne({where: {[Op.and]: [{listings_id: listingID}, {user_id: query}]}})
      .then((review, error) => {
        console.log(review);
        if(error) console.log(error);
        return review.destroy();
      })
        .then(() => {
          console.log('Deleted');
        })
  },

};



