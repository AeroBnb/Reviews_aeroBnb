const {User} = require('./models.js');
// const tables = require('./seed.js');
const faker = require('faker');


// const userData = tables.newUserArray;

// User.sync({force:true})
//   .then(() => {
//     var promises = userData.map((data) => {
//       setTimeout(() => {
//         return User.bulkCreate(data)
//           .then((data) => {
//             console.log(data.length);
//           })
//           .catch((err) => {
//             console.error(err);
//             return Promise.resolve();
//           })
//       }, 500);
//     })
//     return Promise.all(promises)
//     .then(function() {
//       return Promise.resolve();
//     });
//   });

// router.get("/:userId", async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     const pages = await Page.findAll({
//       where: {
//         authorId: req.params.userId
//       }
//     });

//     res.send(userPages(user, pages));
//   } catch (error) { next(error) }
// });

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

