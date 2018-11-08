const Sequelize = require('sequelize');
const config = require('./config.json');
const pg = require('pg');

// const db = new Sequelize('postgres', config.username, config.password, {
// 	dialect: config.dialect,
// 	host: config.host
// })
const db = new Sequelize('postgres://localhost:5432/SDC', {
  logging: false
})



db.authenticate()
	.then(() => {
		console.log('Connection has been successfully established');
	})
	.catch((err) => {
		console.error('Failed to connect to the database', err);
	})

// const database = config.database;
// console.log(`Creating database "${database}..."`);
// db.query(`DROP DATABASE IF EXISTS "${database}"`);
// db.query(`CREATE DATABASE "${database}"`)
// 	.then(() => {
// 		console.log('Database Created');
// 	})

const User = db.define('user', {
	id:{
		type: Sequelize.INTEGER, 
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		allownull: false,
		unique: true
	},
	display_name: {
		type: Sequelize.STRING,
		allownull: true
	},
	photo_url: {
		type: Sequelize.STRING,
		allownull: false,
	},
	profile_url: {
		type: Sequelize.STRING,
		allownull: true,
		defaultValue: null,
	},
});

User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    username: 'John',
    display_name: 'Hancock'
  });
});

User.findAll().then(data => {
  console.log(data[0].username)
})