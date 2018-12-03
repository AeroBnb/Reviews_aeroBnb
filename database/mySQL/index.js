/* REMEMBER TO DELETE DROP DATABSE FROM SCHEMA.SQL WHEN EVERYTHING IS WORKING */
const mysql = require('mysql');
const config = {
  "user": "root", 
  "database": "SDC"
}

const connection = mysql.createConnection(config);
//const user = connection.user();
//const database = connection.database();
//console.log('user: ', user, 'database: ', database);
connection.connect((err) => {
  if (err) {
    console.error('error: ' + err.stack);
  } else {
    console.log('connected: ' + connection.threadId);
  }
});

module.exports = connection;