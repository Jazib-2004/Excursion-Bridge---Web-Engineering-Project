const express = require("express");
const router = express.Router();
const touristcontroller = require("../controllers/tourist_controller");

// requests to the root path ("/") of the "/tourist" route. 

router.get("/", touristcontroller.tourist);


module.exports = router;