// travelagency.js
const express = require('express');
const router = express.Router();
const travelAgencyController = require('../controllers/travelagency_controller');

// Define routes for travel agency-related actions
router.get('/tripsofagency', travelAgencyController.getTrips);

module.exports = router;
