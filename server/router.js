const express = require('express');
const path = require('path');
const mySqlController = require('./controller/mySQl/controller.js');
const knexController = require('./controller/knex/controller.js');
const controller = require('./controller/mongo/controller.js');
const seqController = require('./controller/sequelize/controller.js');

// const { getAllReviews, getRatings, search, postReviews, updateReviews, deleteReviews} = require('./models/mongo/index.js');
const { getAllReviews, getRatings, search, postReviews, updateReviews, deleteReviews} = require('./models/knex/model.js');

const React = require('react');
const ReactDOM = require('react-dom/server');
const axios = require('axios');
const fs = require('fs');
const fetch = require('fetch');
const Bundle = require('../client/dist/bundle-server.js').default;


const router = express.Router();



//-------MongoDB Controller-----------

// router.get('/reviews', controller.getAllReviews);
// router.get('/ratings', controller.getRatings);
// router.get('/search', controller.search);
// router.post('/reviews', controller.postReviews);
// router.put('/reviews', controller.updateReviews);
// router.delete('/reviews', controller.deleteReviews);

//--------Sequelize Controller ---------

// router.get('/reviews', seqController.getAllReviews);
// router.get('/ratings', seqController.getRatings);
// router.get('/search', seqController.search);
// router.post('/reviews', seqController.postReviews);
// router.put('/reviews', seqController.updateReviews);
// router.delete('/reviews', seqController.deleteReviews);

//--------- MySQl controller ----------
// router.get('/reviews', mySqlController.getAllReviews);
// router.get('/ratings', mySqlController.getRatings);
// router.get('/search', mySqlController.search);
// router.post('/reviews', mySqlController.postReviews);
// router.put('/reviews', mySqlController.updateReviews);
// router.delete('/reviews', mySqlController.deleteReviews);

//------------------- Knex Controller -----------------

router.get('/reviews', knexController.getAllReviews);
router.get('/ratings', knexController.getRatings);
router.get('/search', knexController.search);
router.post('/reviews', knexController.postReviews);
router.put('/reviews', knexController.updateReviews);
router.delete('/reviews', knexController.deleteReviews);

// Changes made


function starsLoaded(ratings) {
  let sum = 0;
  for (var key in ratings[0]) {
    sum += ratings[0][key]
  }
  let avg = sum / 6;
  return { starsLoaded: true, avgRating: avg }
}

function reviewsLoaded(reviews) {
  return { ratingsLoaded: true, totalRatings: reviews.length }
};

function ratings(reviews) {
  var communication = 0, accuracy = 0, cleanliness = 0, location = 0, check_in = 0, value = 0
  var ratings = {}
  reviews.forEach((review) => {
    communication += review.communication;
    accuracy += review.accuracy;
    cleanliness += review.cleanliness;
    location += review.location;
    check_in += review.check_in;
    value += review.value;
  })
  communication /=  reviews.length;
  accuracy /=  reviews.length;
  cleanliness /=  reviews.length;
  location /=  reviews.length;
  check_in /=  reviews.length;
  value /=  reviews.length;
  ratings.communication = communication;
  ratings.accuracy = accuracy;
  ratings.cleanliness = cleanliness;
  ratings.location = location;
  ratings.check_in = check_in;
  ratings.value = value;
  return ratings
}


const ssr = (listingID) => {
  var props = {};
  // console.log('I am in ssr');
  return new Promise((resolve, reject) => {
    getAllReviews(listingID, (data) => {
      props.reviews = data;
      review_date = data[0].review_date.toString().substring(0, 10);
      props.reviews[0].review_date = review_date;
      props.ratings = [ratings(props.reviews)];
      // getRatings(listingID, (result) => {
      //   console.log('Ratings: ', result);
      //   props.ratings = result; 
        var avgObj = starsLoaded(props.ratings);
        var totalRatingsObj = reviewsLoaded(props.reviews);
        props.ratingsLoaded = totalRatingsObj.ratingsLoaded;
        props.totalRatings = totalRatingsObj.totalRatings;
        props.starsLoaded = avgObj.starsLoaded;
        props.avgRating = avgObj.avgRating;
        let component = React.createElement(Bundle, props);
        let App = ReactDOM.renderToString(component);
        resolve([App, JSON.stringify(props)]);
      // })
  });
  
  })

}

// -------- Server Side Rendering for client side  -------- //
router.get('/listing', function htmlTemplate(req, res) {
  var id =parseInt(req.query.id);
  console.log(id);
  ssr(id)
    .then((results) => {
      res.end(`<!DOCTYPE html>
      <html>
      <head>
        <title>Reviews</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      </head>
      <body>
        <div id="reviews">${results[0]}</div>
        <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        <script type="text/javascript" src="/bundle.js"></script>
        <script>
          ReactDOM.hydrate(
            React.createElement(Reviews, ${results[1]}),
            document.getElementById('reviews')
          );
        </script>
      </body>
      </html>
    `)
    })
});


//--------- Server Side Rendering for Proxy ----------- //


router.get('/renderReviews', (req, res) => {
  console.log('I am in the Proxy Get')
	ssr(req.query.id)
		.then((results) => {
      console.log(results);
			res.send(results);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send();
		});
});


router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

module.exports = router;
