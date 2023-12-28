const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');


// Route for adding a new trip
router.post('/add', tripController.addTrip);

// Route for deleting a trip
router.delete('/delete/:tripId', tripController.deleteTrip);

// Edit trip route
router.put('/edit/:tripId', tripController.editTrip);


module.exports = router;
