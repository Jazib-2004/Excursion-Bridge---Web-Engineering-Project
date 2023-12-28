const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.post('/add', reviewController.addReview);
router.get('/averageRating', reviewController.getAverageRating);

module.exports = router;
