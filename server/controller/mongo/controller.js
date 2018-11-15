const { getAllReviews, getRatings, search } = require('../../models/mongo/index.js');

module.exports = {
  getAllReviews: (req, res) => {
    getAllReviews(req.query.id, (response) => {
      console.log(response)
      res.send(response);
    });
  },

  getRatings: (req, res) => {
    getRatings(req.query.id, (response) => {
      res.send(response);
    });
  },

  search: (req, res) => {
    search(req.query.id, req.query.query, (response) => {
      res.send(response);
    });
  },
};
