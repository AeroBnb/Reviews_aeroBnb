const express = require('express');
const path = require('path');
const mySqlController = require('./controller/mySQl/controller.js');
const knexController = require('./controller/knex/controller.js');
const controller = require('./controller/mongo/controller.js');
const seqController = require('./controller/sequelize/controller.js');

const router = express.Router();

//-------MongoDB Controller-----------

router.get('/reviews', controller.getAllReviews);
router.get('/ratings', controller.getRatings);
router.get('/search', controller.search);
router.post('/reviews', controller.postReviews);
router.put('/reviews', controller.updateReviews);
router.delete('/reviews', controller.deleteReviews);

//--------Sequelize Controller ---------

// router.get('/reviews', seqController.getAllReviews);
// router.get('/ratings', seqController.getRatings);
// router.get('/search', seqController.search);
// router.post('/reviews', seqController.postReviews);
// router.put('/reviews', seqController.updateReviews);
// router.delete('/reviews', seqController.deleteReviews);

//--------- MySQl controller ----------
// router.get('/reviews', mySqlController.getAllReviews);
// router.get('/ratings', mySqlController.getRatings);
// router.get('/search', mySqlController.search);
// router.post('/reviews', mySqlController.postReviews);
// router.put('/reviews', mySqlController.updateReviews);
// router.delete('/reviews', mySqlController.deleteReviews);

//------------------- Knex Controller -----------------

// router.get('/reviews', knexController.getAllReviews);
// router.get('/ratings', knexController.getRatings);
// router.get('/search', knexController.search);
// router.post('/reviews', knexController.postReviews);
// router.put('/reviews', knexController.updateReviews);
// router.delete('/reviews', knexController.deleteReviews);

// Changes made

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

module.exports = router;
