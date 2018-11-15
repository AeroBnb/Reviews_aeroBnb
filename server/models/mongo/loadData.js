// const mongoose = require('mongoose');
// const db = require('../../../database/mongoDB.js');
const exec = require('child_process').exec;
// const data = require('./seed.js');

var start = Date.now();
console.log(`Start time: ${start}`);
// const mongoImport = async function() {
// 	await new Promise((resolve, reject) => {
// 		var addListings = exec('mongoimport --db SDCupdated --collection Listings  --file ./many.json',
// 			(error, stdout, stderr) => {
// 					resolve();
// 					console.log(`${stdout}`);
// 					console.log(`${stderr}`);
// 					if (error !== null) {
// 						console.log(`exec error: ${error}`);
// 						return;
// 					}
// 				console.log((Date.now() - start)/1000);
// 			});
// 			resolve();
// 		})
// 		console.log((Date.now() - start)/1000);
// }();


var yourscript = exec('mongoimport --db SDCupdated --collection Listings  --file ./many.json',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
