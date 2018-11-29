require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./router.js');
const { getAllReviews, getRatings, search, postReviews, updateReviews, deleteReviews} = require('./models/mongo/index.js');
const React = require('react');
const ReactDOM = require('react-dom/server');
const axios = require('axios');
const fs = require('fs');
const fetch = require('fetch');
const Bundle = require('../client/dist/bundle-server.js').default;


const {knex} = require('../database/postgres/index.js');
//const knex = require('../database/')
const postgres = require('../database/sequelize/postgres.js')

const app = express();
const source = path.join(__dirname, '/../client/dist');



app.use(bodyParser.json());

app.use(cors());
// app.all('/*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const ssr = (listingID) => {
  console.log('I am in ssr');
  var props = {};
  return new Promise((resolve, reject) => {
    getAllReviews(listingID, (data) => {
      props.reviews = data;
      getRatings(listingID, (result) => {
        props.ratings = result;
        let component = React.createElement(Bundle, props);
        let App = ReactDOM.renderToString(component);
        resolve([App, JSON.stringify(props)]);
      })
  });
  
  })
// (async() => {
  //   await axios.get('http://localhost:7000/reviews', {
  //     params: {
  //       id: listingID
  //     }
  //   })
  //   .then(({data}) => {
  //     console.log('data', data)
  //     props.reviews = data;
  //     (async() => {
  //       await axios.get('http://localhost:7000/ratings', {
  //         params: {
  //           id: listingID
  //         }
  //       })
  //       .then(({result}) => {
  //         console.log('result ', result);
  //         props.ratings = result;
  //         console.log('props: ', props);
          // let component = React.createElement(Bundle, props);
          // let App = ReactDOM.renderToString(component);
          // return [App, props];
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       })
  //     })();
  //   })
  // })();
}

app.get('/listing', function htmlTemplate(req, res) {
  console.log('I am in server side rendering');
  ssr(req.query.id)
    .then((results) => {
      res.end(`<!DOCTYPE html>
      <html>
      <head>
        <title>Reviews</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      </head>
      <body>
        <div id="reviews">${results[0]}</div>
        <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        <script type="text/javascript" src="/bundle.js"></script>
        
      </body>
      </html>
    `)
    })
});




app.use(express.static(source));


app.use('/', router);

app.listen(7000, () => { console.log('Listening on port 7000'); });




module.exports.app = app;
