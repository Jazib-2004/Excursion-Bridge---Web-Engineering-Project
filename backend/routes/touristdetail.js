// touristdetails.js
const express = require('express');
const router = express.Router();
const touristDetailsController = require('../controllers/tourist_details_controller');

// Define route for displaying tourist details
router.get('/:tourId/tourists', touristDetailsController.getTouristDetails);

module.exports = router;
