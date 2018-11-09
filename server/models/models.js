const db = require("../../database/postgres.js");
const Sequelize = require("sequelize");

const User = db.define('user', {
	id:{
		type: Sequelize.INTEGER, 
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
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

module.exports.User = User;