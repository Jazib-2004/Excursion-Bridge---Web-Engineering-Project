const express = require("express");
const router = express.Router();
const touristcontroller = require("../controllers/tourist_controller");

// router.post("/", authcontroller.register);

router.post("/", (req, res) => {

    // const { tourId } = req;
    // console.log("Tour ID is succesfully retrieved in routes", tourId);
    // touristcontroller.register(req, res, tourId);

    const { tourId, userId } = req;
    console.log("Tour ID is successfully retrieved in routes", tourId);
    console.log("User ID is successfully retrieved in routes", userId);

    touristcontroller.register(req, res, tourId, userId);
});

module.exports = router;
