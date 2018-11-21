const pg = require('pg');
// const config = require('../config.js');
const knex = require('knex');

const connection = knex({
  client: 'pg',
  connection: {
      host: 'localhost',
      database: 'SDC'
    // user: config.username,
    // password: config.password,
    // database: config.database
  }
});
const result = knex.raw(`SELECT *
FROM Reviews
LEFT JOIN Users
ON Reviews.user_id = Users.id
WHERE Reviews.listings_id = 6
ORDER BY Reviews.review_date DESC;
`);

console.log(result);
module.exports = connection;