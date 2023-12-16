const express = require("express");
const router = express.Router();
const touristcontroller = require("../controllers/tourist_controller");

// router.get("/", tourcontroller.detail);

router.get("/", (req, res) => {

    const { tourId } = req;
    console.log("Tour ID is succesfully retrieved in routes", tourId);
    touristcontroller.detail(req, res, tourId);
});

module.exports = router;