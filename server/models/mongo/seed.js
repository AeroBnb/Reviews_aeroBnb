const faker = require('faker');
const casual = require('casual');
const fs = require("fs");

var userArr = [];

const start = Date.now();
var prev = start;

const generateUser = function(){
  for (let i=0; i< 10000; i++) {
    var user = {
      userName: faker.internet.userName(),
      display_name: faker.name.firstName(),
      photo_url: faker.image.imageUrl(),
    }
    userArr.push(user);
  }
}();


const reviewGenerator = function(){
  var reviewArr = [];
  for (let i=0; i< casual.integer(3, 6); i++) {
    var review = {
      review_date: faker.date.past(),
      reviews: faker.lorem.paragraph(),
      accuracy: Math.floor((Math.random()) *5),
      communication: Math.floor((Math.random()) *5),
      cleanliness: Math.floor((Math.random()) *5),
      location: Math.floor((Math.random()) *5),
      check_in: Math.floor((Math.random())*5),
      value: Math.floor((Math.random()) * 5),
      user: userArr[(Math.floor(Math.random() * userArr.length))]
    }
    reviewArr.push(review);
  }
  return reviewArr;
}


 console.log(start);
const getUserData = async function() {
  var count = 1;
  var listingsData = [];
  for( let i = 0; i < 10000; i++) {
    await new Promise((resolve, reject) => {
      var batch = '';
      for(let j = 0; j< 1000; j++) {
        var userData = {
          l_id: count,
          review: reviewGenerator()
        }
         batch += JSON.stringify(userData, null, 3)
        count++;
      }
      resolve (batch);
    }).then(async batch => {
      await new Promise ((resolve, reject) => {
        fs.writeFile('./listings.json', batch, (err) => {
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

