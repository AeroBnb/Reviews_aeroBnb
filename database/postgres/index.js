const pg = require('pg');
// const config = require('../config.js');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'sdcknex',
        // user: config.username,
        // password: config.password,
    }
});

// knex.raw(`SELECT *
// FROM Reviews
// LEFT JOIN Users
// ON Reviews.user_id = Users.id
// WHERE Reviews.listings_id = 10000
// ORDER BY Reviews.review_date DESC;
// `).then (rawresult => {
// 	console.log(rawresult);
// });

// knex.select().from('reviews').where({r_id: 1})
//     .then(result => {
// 			console.log('ia ma in the knex connection ', result);

// 		});

module.exports = knex;