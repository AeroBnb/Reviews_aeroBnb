//const data = require('../seed.js');
const mongoose = require('mongoose');
const db = require('../../../database/mongoDB.js');
// const userData = require('./users.csv');
const exec = require('child_process').exec;



var addUsers = exec(`mongoimport -d SDC -c Users --type csv --file /Users/indu/Documents/Galvanize/HRNYC18/SDC_Project/Reviews_aeroBnb/user.csv --headerline`,
      (error, stdout, stderr) => {
          console.log(`${stdout}`);
          console.log(`${stderr}`);
          if (error !== null) {
              console.log(`exec error: ${error}`);
          }
      });

var addListings = exec(`mongoimport -d SDC -c Users --type csv --file /Users/indu/Documents/Galvanize/HRNYC18/SDC_Project/Reviews_aeroBnb/listings.csv --headerline`,
  (error, stdout, stderr) => {
      console.log(`${stdout}`);
      console.log(`${stderr}`);
      if (error !== null) {
          console.log(`exec error: ${error}`);
      }
  });

var addReviews = exec(`mongoimport -d SDC -c Reviews --type csv --file /Users/indu/Documents/Galvanize/HRNYC18/SDC_Project/Reviews_aeroBnb/reviews.csv --headerline`,
(error, stdout, stderr) => {
    console.log(`${stdout}`);
    console.log(`${stderr}`);
    if (error !== null) {
        console.log(`exec error: ${error}`);
    }
});


//seedDatabase();
