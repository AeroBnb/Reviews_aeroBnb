const express = require('express');
const path = require('path');
const controller = require('./controller/mongo/controller.js');
const seqController = require('./controller/sequelize/controller.js');

const router = express.Router();

// router.get('/reviews', controller.getAllReviews);
// router.get('/ratings', controller.getRatings);
// router.get('/search', controller.search);
// router.post('/reviews', controller.postReviews);
// router.put('/reviews', controller.updateReviews);
// router.delete('/reviews', controller.deleteReviews);

router.get('/reviews', seqController.getAllReviews);
router.get('/ratings', seqController.getRatings);
router.get('/search', seqController.search);
router.post('/reviews', seqController.postReviews);
router.put('/reviews', seqController.updateReviews);
router.delete('/reviews', seqController.deleteReviews);


// Changes made

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

module.exports = router;
