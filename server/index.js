require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./router.js');
const port = process.env.PORT || 7000;
// const {knex} = require('../database/postgres/index.js');
//const knex = require('../database/')
// const postgres = require('../database/sequelize/postgres.js')

const app = express();
const source = path.join(__dirname, '/../client/dist');



app.use(bodyParser.json());

app.use(cors());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});



app.use(express.static(source));

app.get('/test', (req, res) => {
  res.send('test');
})

app.use('/', router);


app.listen(port, '0.0.0.0', () => { console.log('Listening on port 7000'); });




module.exports.app = app;
