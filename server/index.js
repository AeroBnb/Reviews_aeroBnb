require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./router.js');
const React = require('react');
const ReactDOM = require('react-dom/server');
const axios = require('axios');
const fs = require('fs');
const fetch = require('fetch');
const Bundle = require()


const {knex} = require('../database/postgres/index.js');
//const knex = require('../database/')
const postgres = require('../database/sequelize/postgres.js')

const app = express();
const source = path.join(__dirname, '/../client/dist');

app.use(bodyParser.json());

app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(source));

app.use('/', router);

app.listen(7000, () => { console.log('Listening on port 7000'); });

module.exports.app = app;
