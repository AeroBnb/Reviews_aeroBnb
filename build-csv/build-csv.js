const faker = require('faker');
const fs = require('fs');
const Json2csvParser = require("json2csv").Parser;
const userFile = fs.createWriteStream("user.csv");
const reviewsFile = fs.createWriteStream("reviews.csv");
const listingsFile = fs.createWriteStream("listings.csv");


var userData = {};
var listingsData = {};
var reviewsData = {};

const userFields = [
  "id",
  "username",
  "display_name",
  "photo_url",
  "profile_url",
];
  
  var userArr = [];
  
const listingFields = [
  "l_id",
  "address"
]
  
const reviewFields = [
  "r_id",
  "listings_id",
  "user_id",
  "review_date",
  "reviews",
  "accuracy",
  "communication",
  "cleanliness",
  "location",
  "check_in",
  "value"
];

var user = { fields: userFields, header: false };
var review = {fields: reviewFields, header: false};
var listing = {fields: listingFields, header: false};

const Json2csvUsers = new Json2csvParser(user);
const Json2csvReviews = new Json2csvParser(review);
const Json2csvListings = new Json2csvParser(listing);

const start = Date.now();
var prev = start;

console.log(start);
const getReviewsData = async function() {
  var count = 1;
  // var reviewsData = [];
  for( let i = 0; i < 10000; i++) {
    await new Promise((resolve, reject) => {
      var reviewArr = [];
      for(let j = 0; j< 1000; j++) {
        var reviewsData = {
          r_id: count,
          review_date: faker.date.recent(),
          reviews: faker.lorem.paragraph(),
          accuracy: Math.floor((Math.random()) *5),
          communication: Math.floor((Math.random()) *5),
          cleanliness: Math.floor((Math.random()) *5),
          location: Math.floor((Math.random()) *5),
          check_in: Math.floor((Math.random())*5),
          value: Math.floor((Math.random()) * 5),
          listings_id: Math.floor((Math.random() * 10000)),
          user_id: Math.floor((Math.random() * 10000)),
        }
        // userData.reviews = userData.reviews.slice(10);
        reviewArr.push(reviewsData);
        count++;
      }
      resolve (reviewArr);
    }).then(async batch => {
      let csv = Json2csvReviews.parse(batch);
      await reviewsFile.write(csv + "\n");
      console.log(
        "Review " + i + " took " + (Date.now() - prev) / 1000 + " seconds."
      );
      prev = Date.now();
    });
  }
  reviewsFile.end();
  var end = Date.now();
  console.log("Review Generation took " + (end - start) / 1000 + " seconds.");
}();

  const getListingsData = async function() {
    var id = 1;
    for(let i = 0; i < 10000; i++) {
      console.log(i);
      await new Promise((resolve, reject) => {
      var arr = [];
      for(var j=0; j< 1000; j++) {
        listingsData = {
          l_id: id,
          address: faker.address.streetAddress(),
        }
        arr.push(listingsData);
        id++;
      }
      resolve (arr);
    }).then(async listings => {
      let csv = Json2csvListings.parse(listings);
      await listingsFile.write(csv + "\n");
      console.log(
        "Listings " + i + " took " + (Date.now() - prev) / 1000 + " seconds."
      );
      prev = Date.now();
    });
  }
  listingsFile.end();
  var end = Date.now();
  console.log("Listings Generation took " + (end - start) / 1000 + " seconds.");
  }();
  
  
  
  
  const getUserData = async function() {
    var id = 1;
    for(let i = 0; i < 10000; i++) {
      await new Promise((resolve, reject) => {
      var arr = [];
      for(var j=0; j< 1000; j++) {
        userData = {
          u_id:id,
          username: faker.internet.userName(),
          display_name: faker.name.firstName(),
          photo_url: faker.image.imageUrl(),
          profile_url: faker.image.imageUrl()
        }
        arr.push(userData);
        id++;
      }
      resolve (arr);
    }).then(async user => {
      let csv = Json2csvUsers.parse(user);
      await userFile.write(csv + "\n");
      console.log(
        "User " + i + " took " + (Date.now() - prev) / 1000 + " seconds."
      );
      prev = Date.now();
    });
  }
  userFile.end();
  var end = Date.now();
  console.log("User Generation took " + (end - start) / 1000 + " seconds.");
  }();
