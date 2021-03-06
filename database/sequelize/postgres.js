const Sequelize = require('sequelize');
//const config = require('../../config.js');


// const Sequelize = require('sequelize');
// const password = require('../config.js').DB_PASSWORD;

// const db  = new Sequelize('SDCupdated', config.username, config.password, {
// 	host: 'localhost',
// 	dialect: 'postgres',
// 	pool: {
// 		max: 30,
// 		min: 0,
// 		idle: 10000000,
// 		acquire: 10000000
// 	},
// 	logging: false
// });

const db = new Sequelize('postgres://localhost:5432/sdcknex', {
  logging: false
})

// const db = new Sequelize('postgres://indu:manindu2007@example.com/SDCupdated', {
//   logging: false
// })

db.authenticate()
	.then(() => {
		console.log('Connection has been successfully established');
	})
	.catch((err) => {
		console.error('Failed to connect to the database', err);
	})


module.exports = {db};

