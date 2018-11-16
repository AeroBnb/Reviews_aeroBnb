const faker = require('faker');
const casual = require('casual');
const fs = require("fs");

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
const avgScoreFunc = function() {
  var reviewObj = reviewGenerator().reviewObj;
  var arrOfValues = Object.values(reviewObj);
  var communication = 0, accuracy = 0, cleanliness =0, location = 0, check_in = 0, value = 0;
  var length = arrOfValues.length - 1;
  for(var i = 0; i< length; i++) {
    communication += arrOfValues[i].communication;
    accuracy += arrOfValues[i].accuracy;
    cleanliness += arrOfValues[i].cleanliness;
    location += arrOfValues[i].location;
    check_in += arrOfValues[i].check_in;
    value += arrOfValues[i].value;
  }
  return {
    communication: Math.floor(communication / length),
    accuracy: Math.floor(accuracy / length),
    cleanliness: Math.floor(cleanliness / length),
    location: Math.floor(location / length),
    check_in: Math.floor(check_in / length),
    value: Math.floor(value / length),
  }
}

const totalReview = function() {
  return (Object.values(reviewGenerator().reviewObj).length);
}

console.log(start);
const getUserData = async function() {
  var count = 1;
  var batch = '';
  var listingsData = [];
  for( let i = 0; i < 100; i++) {
    await new Promise((resolve, reject) => {
      for(let j = 0; j< 1000; j++) {
        var userData = {
          id: count,
          reviews: reviewGenerator().reviewObj,
          avg_score: avgScoreFunc(),
          total_reviews: totalReview(),
          top_Five: reviewGenerator().topTenUsers,
        }
        batch += JSON.stringify(userData, null, 3)
        count++;
      }
      resolve (batch);
    }).then(async batch => {
      await new Promise ((resolve, reject) => {
        fs.writeFile('./many.json', batch, (err) => {
          resolve();
          if(err) {
            console.error(err);
            return;
          }
        })
      })

      console.log(
        "User " + i + " took " + (Date.now() - prev) / 1000 + " seconds."
      );
      prev = Date.now();
    })
  }
  var end = Date.now();
  console.log("User Generation took " + (end - start) / 1000 + " seconds. to insert 10,000,000");
}();

