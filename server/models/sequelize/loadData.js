const {User} = require('./models.js');
const {Reviews} = require('./models.js');
const {Listings} = require('./models.js');

const faker = require('faker');

var  start = Date.now();
User.sync({force:true})
  .then(async () => {
    for(let i = 0; i < 100; i++) {
      var arr = [];
      for(var j=0; j< 100000; j++) {
        var userData = {
          username: faker.internet.userName(),
          display_name: faker.name.firstName(),
          photo_url: faker.image.imageUrl(),
          profile_url: faker.image.imageUrl(),
        }
        arr.push(userData);
      }
      var now = new Date();
      console.log('before waiting: ', now)
      await User.bulkCreate(arr);
      console.log('time passed: ', new Date() - now)
      console.log(i);
      var end = Date.now();
      console.log((end-start)/1000);
    }
  })
  .catch((err) => {
    console.error(err);
  });

  var  start = Date.now();
  Listings.sync({force:true})
    .then(async () => {
      for(let i = 0; i < 100; i++) {
        var arr = [];
        for(var j=0; j< 100000; j++) {
          var userData = {
            username: faker.address.streetAddress(),
          }
          arr.push(userData);
        }
        var now = new Date();
        console.log('before waiting: ', now)
        await Listings.bulkCreate(arr);
        console.log('time passed: ', new Date() - now)
        console.log(i);
        var end = Date.now();
        console.log((end-start)/1000);
      }
    })
    .catch((err) => {
      console.error(err);
    });


var  start = Date.now();
Reviews.sync({force:true})
  .then(async () => {
    for(let i = 0; i < 100; i++) {
      var arr = [];
      for(var j=0; j< 100000; j++) {
        var userData = {
          review_date: faker.date.past(),
          review: faker.lorem.paragraph(),
          accuracy: Math.floor((Math.random()) *5),
          communication: Math.floor((Math.random()) *5),
          cleanliness: Math.floor((Math.random()) *5),
          location: Math.floor((Math.random()) *5),
          check_in: Math.floor((Math.random())*5),
          value: Math.floor((Math.random()) * 5),
          listings_id: ((Math.random() + 1) * 1000),
          user_id: ((Math.random() + 1) * 1000),
        }
        arr.push(userData);
      }
      var now = new Date();
      console.log('before waiting: ', now)
      await Reviews.bulkCreate(arr);
      console.log('time passed: ', new Date() - now)
      console.log(i);
      var end = Date.now();
      console.log((end-start)/1000);
    }
  })
  .catch((err) => {
    console.error(err);
  });