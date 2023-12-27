
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search_controller');

// Define routes for different search options
router.get('/getToursByDate/:userId/:date', searchController.getToursByDate);
router.get('/getToursByDestination/:userId/:destination', searchController.getToursByDestination);
router.get('/getToursByCost/:userId/:cost', searchController.getToursByCost);

module.exports = router;
