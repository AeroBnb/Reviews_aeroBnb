const faker = require('faker');


const getUserData = function() {
  var newUserArray = [];
  for( let i = 0; i < 1000; i++) {
    var arr = [];
    for(let j = 0; j< 1000; j++) {
      var userData = {
        userName: faker.internet.userName(),
        display_name: faker.name.firstName(),
        photo_url: faker.image.imageUrl(),
        profile_url: faker.image.imageUrl(),
      }
      arr.push(userData);
    }
    newUserArray.push(arr);
  }
  return newUserArray;
};
// 

const getReviewsData = function() {
  var newReviewsArray = [];
  for(let i = 0; i < 1000; i++) {
    var arr = [];
    for(var j=0; j< 1000; j++) {
      var reviewsData = {
        review_date: faker.date.past(),
        review: faker.lorem.paragraph(),
        accuracy: Math.floor((Math.random()) *5),
        communication: Math.floor((Math.random()) *5),
        cleanliness: Math.floor((Math.random()) *5),
        location: Math.floor((Math.random()) *5),
        check_in: Math.floor((Math.random())*5),
        value: Math.floor((Math.random()) * 5),
        // address: faker.address.streetAddress(),
        listings_id: ((Math.random() + 1) * 100),
        user_id: ((Math.random() + 1) * 100),
      }
      arr.push(reviewsData);
    }
    newReviewsArray.push(arr);
    console.log(i);
  }
  return newReviewsArray;
}

var newUserArray = getUserData();
// console.log(newUserArray);
// var newBookingsArray = getBookingsData();
var newReviewsArray = getReviewsData();

module.exports = {newUserArray, newReviewsArray};
//module.exports = {newUserArray};
