const mongoose = require('mongoose');
const db = require('../../../database/mongoDB.js');
const exec = require('child_process').exec;


var addListings = exec(`mongoimport -d SDC -c Users --type csv --file /Users/indu/Documents/Galvanize/HRNYC18/SDC_Project/Reviews_aeroBnb/listings.json --headerline`,
  (error, stdout, stderr) => {
      console.log(`${stdout}`);
      console.log(`${stderr}`);
      if (error !== null) {
          console.log(`exec error: ${error}`);
      }
  });
