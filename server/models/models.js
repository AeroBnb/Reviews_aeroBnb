const db = require("../../database/postgres.js");
const Sequelize = require("sequelize");

const User = db.define('user', {
	id: {
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
	bookings_id: {
		type: Sequelize.INTEGER,
		allownull: false,
	},

});

const Reviews = db.define('reviews', {
	r_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	listings_id: {
		type: Sequelize.INTEGER,
		allownull: false,
	},
	user_id: {
		type: Sequelize.INTEGER,
		allownull: false,
	},
	review_date: {
		type: Sequelize.DATE,
	},
	reviews: {
		type: Sequelize.TEXT
	},
	accuracy: {
		type: Sequelize.INTEGER
	},
	communication: {
		type: Sequelize.INTEGER
	},
	cleanliness: {
		type: Sequelize.INTEGER
	},
	location: {
		type: Sequelize.INTEGER
	},
	check_in: {
		type: Sequelize.INTEGER
	},
	value: {
		type: Sequelize.INTEGER
	}

});


const Listings = db.define('listings', {
	l_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	address: {
		type: Sequelize.STRING,
	}
})


module.exports.User = User;
module.exports.Listings = Listings;
module.exports.Reviews = Reviews;