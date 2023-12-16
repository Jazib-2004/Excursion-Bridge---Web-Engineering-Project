const express = require("express");
const router = express.Router();
const touristcontroller = require("../controllers/tourist_controller");

// router.post("/", authcontroller.register);


router.post("/", (req, res) => {

    const { tourId } = req;
    console.log("Tour ID is succesfully retrieved in routes", tourId);
    touristcontroller.register(req, res, tourId);
});

module.exports = router;