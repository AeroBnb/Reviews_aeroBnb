const faker = require('faker');
const moment = require('moment');
const fs = require('fs');


const randomDate = (startDate = new Date(2015, 08, 01), endDate = new Date()) => {
let rand = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
return rand.toISOString().slice(0,10);
}

const writeToStream = (writer, constructor, len) => {
  let startTime = moment();
  let i = len;

  const write = () => {
    let ok = true;
    while (i > 0 && ok) {
      const newBufferTime = moment();
      let data = constructor(500).join('\n') + '\n';
      ok = writer.write(data);
      const endBufferTime = moment();
      console.log(`${i}: Total time: ${(endBufferTime - startTime) / 1000}, Batch time: ${(endBufferTime - newBufferTime) / 1000}`)
      i--;
    }
    if (i > 0) {
      writer.once('drain', write);
    }
    if (i === 0) {
      writer.end();
    }
  };
  write();
}
( async() => {
////////// REVIEWS //////////
const reviewsStream = fs.createWriteStream('./build-csv/reviews.csv');
let reviewIdTracker = 1;
//let bookingIdHash = {};
const createReviews = (num) => {
  let arrayOfReviews = [];
  
  for (i = 0; i < num; i++) {
    let listingId = Math.floor((Math.random()) * 100) + i;
    let userId = Math.floor((Math.random()) * 100) + i;
    // if (!bookingIdHash.hasOwnProperty(listingId)) {
    //   bookingIdHash[listingId] = true;
    // } else {
    //   while (bookingIdHash.hasOwnProperty(listingId)) {
    //     listingId++;
    //   }
    //   bookingIdHash[listingId] = true;
    // }
    arrayOfReviews.push(`${reviewIdTracker}\t${listingId}\t${userId}\t${randomDate()}` + 
      `\t${faker.lorem.paragraphs(Math.ceil(Math.random() * 2)).replace(/\n/g, '\\n').replace(/\r/g, '\\r')}` + 
      `\t${Math.ceil(Math.random() * 5)}\t${Math.ceil(Math.random() * 5)}` +
      `\t${Math.ceil(Math.random() * 5)}\t${Math.ceil(Math.random() * 5)}` + 
      `\t${Math.ceil(Math.random() * 5)}\t${Math.ceil(Math.random() * 5)}`);
      reviewIdTracker++;
  }
  return arrayOfReviews;
}
const startReviews = moment();
let writeAllReviews = () => {
  return new Promise((resolve) => {
    writeToStream(reviewsStream, createReviews, 20);
    reviewsStream.on('finish', () => {
      resolve();
    })
  })
}
await writeAllReviews();
const endReviews = moment();

////////// LISTINGS //////////
const listingsStream = fs.createWriteStream('./build-csv/listings.csv');
const startListings = moment();
let listingIdTracker = 1;
const createListings = (num) => {
  let listingsArr = [];
  for (i = 0; i < num; i++) {
    
    listingsArr.push(`${listingIdTracker}\t${faker.address.streetAddress()}`);
    listingIdTracker++;
  }
  return listingsArr;
}
let writeAllListings = () => {
  return new Promise((resolve) => {
    writeToStream(listingsStream, createListings, 20);
    listingsStream.on('finish', () => {
      resolve();
    })
  })
}
await writeAllListings();
const endListings = moment();
////////// USERS //////////
const usersStream = fs.createWriteStream('./build-csv/users.csv');
const startUsers = moment();
let userIdTracker = 1;
const createUsers = (num) => {
  let usersArr = [];
  for (i = 0; i < num; i++) {
    usersArr.push(`${userIdTracker}\t${faker.internet.userName()}\t${faker.name.firstName()}` + 
      `\t${faker.image.imageUrl()}` + 
      `\t${faker.internet.url()}`
    )
    userIdTracker++;
  }
  return usersArr;
}
let writeAllUsers = () => {
  return new Promise((resolve) => {
    writeToStream(usersStream, createUsers, 20);
    usersStream.on('finish', () => {
      resolve();
    })
  })
}
await writeAllUsers();
const endUsers = moment();
console.log('duration for Reviews creation & writing:', endReviews.diff(startReviews), 'ms');
console.log('duration for Listings:', endListings.diff(startListings), 'ms');
console.log('duration for Users:', endUsers.diff(startUsers), 'ms');
console.log('TOTAL duration for all four files:', endUsers.diff(startReviews), 'ms');
})();