const { getAllReviews, getRatings, search, postReviews, updateReviews, deleteReviews} = require('../../models/knex/model.js');

module.exports = {
  getAllReviews: (req, res) => {
    getAllReviews(req.query.id, (response) => {
      res.send(response);
    });
  },

  getRatings: (req, res) => {
    console.log('I am in rating controller');
    getRatings(req.query.id, (response) => {
      res.send(response);
    });
  },

  search: (req, res) => {
    search(req.query.id, req.query.query, (response) => {
      res.send(response);
    });
  },

  postReviews: (req, res) => {
    console.log(req.query);
    console.log(req.body)
    postReviews(req.query.id, req.body, (response) => {
      console.log(response)
      res.send(response);
    });
  },

  updateReviews: (req, res) => {
    updateReviews(req.query.id, req.query.query,(response) => {
      console.log(response)
      res.send(response);
    });
  },

  deleteReviews: (req, res) => {
    deleteReviews(req.query.id, req.query.query,(response) => {
      console.log(response)
      res.send(response);
    });
  },

};
