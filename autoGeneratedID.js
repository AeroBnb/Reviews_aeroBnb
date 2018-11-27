// const {getAllListingID} = require('./server/models/sequelize/index.js');

module.exports = {
  generateRandomID: function(userContext, events, done) {
		var id = Math.floor((Math.random()) * 100) + 1;
		userContext.vars.id = id;
		//var ids = getAllListingID();
		return done();
	}
}