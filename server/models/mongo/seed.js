const faker = require('faker');
const casual = require('casual');
const fs = require("fs");
const exec = require('child_process').exec;


var userArr = [];

const start = Date.now();
var prev = start;

const generateUser = function(){
  for (let i=0; i< 10000; i++) {
      userArr.push(faker.internet.userName());
  }
}();

const getUser = function() {
  var index = (Math.floor(Math.random() * userArr.length));
  var user = userArr[index];
  return user;
}

//Helper function to generate the reviews
const reviewGenerator = function(){
  var reviewObj = {};
  var topTenUsers = [];
  var user;
  for (let i=0; i< casual.integer(3, 6); i++) {
    user = getUser();
    if(topTenUsers.length < 10) topTenUsers.push(user);
    var reviewData = {
      review_date: faker.date.recent(),
      reviews: faker.lorem.paragraph(),
      accuracy: Math.floor((Math.random()) *5),
      communication: Math.floor((Math.random()) *5),
      cleanliness: Math.floor((Math.random()) *5),
      location: Math.floor((Math.random()) *5),
      check_in: Math.floor((Math.random())*5),
      value: Math.floor((Math.random()) * 5),
      display_name: faker.name.firstName(),
      photo_url: faker.image.imageUrl(),  
    }
    reviewObj[user] = reviewData;
  }
  return {reviewObj, topTenUsers};
}

// helper function for keeping the average score
const avgScoreFunc = function(reviewObj) {
  var arrOfValues = Object.values(reviewObj);
  var communication = 0, accuracy = 0, cleanliness =0, location = 0, check_in = 0, value = 0;
  var length = arrOfValues.length;
  for(var i = 0; i< length; i++) {
    communication += arrOfValues[i].communication;
    accuracy += arrOfValues[i].accuracy;
    cleanliness += arrOfValues[i].cleanliness;
    location += arrOfValues[i].location;
    check_in += arrOfValues[i].check_in;
    value += arrOfValues[i].value;
  }
  return {
    communication: (communication / length),
    accuracy: (accuracy / length),
    cleanliness: (cleanliness / length),
    location: (location / length),
    check_in: (check_in / length),
    value: (value / length),
  }
}

const totalReview = function(reviewObj) {
  return (Object.values(reviewObj).length);
}

console.log(start);
const getUserData = async function() {
  var count = 1;
  var listingsData = [];
  for( let i = 0; i < 10000; i++) {
    var batch = '';
    await new Promise((resolve, reject) => {
      for(let j = 0; j< 1000; j++) {
        var generatedReviews = reviewGenerator();
        var userData = {
          id: count,
          reviews: generatedReviews.reviewObj,
          avg_score: avgScoreFunc(generatedReviews.reviewObj),
          total_reviews: totalReview(generatedReviews.reviewObj),
          top_Five: generatedReviews.topTenUsers,
        }
        batch += JSON.stringify(userData, null, 3)
        count++;
      }

      fs.appendFile('./many1.json', batch, (err) => {
        console.log(
          "User " + i + " took " + (Date.now() - prev) / 1000 + " seconds."
        );
        prev = Date.now();
        resolve();
        if(err) {
          console.error(err);
          return;
        }

      })
    })
  }
  var end = Date.now();
  console.log("User Generation took " + (end - start) / 1000 + " seconds. to insert 10,000,000");

  var yourscript = exec('mongoimport --db SDCupdated --collection Users  --file ./many1.json',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });

}();

//module.exports = {getUserData}