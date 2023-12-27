const express = require("express");
const router = express.Router();
const path = require("path");
const touristRouter = require('./tourist-page');
const tourRouter = require('./tour-detail');
const regRouter = require("./register");

router.get("/",(req, res) => {
    res.render("index");
})

router.get("/login",(req, res) => {
    res.render("login");
})

router.get("/signup",(req, res) => {
    res.render("signup");
})
//const touristRouter = require('./tourist-page');
router.use('/tourist', touristRouter);



 // router.use("/tourist/:id", tourRouter)
// router.use("/tourist/:id", (req, res, next) => {

//     const { id } = req.params;
//     console.log(id);
//     req.tourId = id;
//     // Continue to the next middleware
//     next();
// }, tourRouter);

//const tourRouter = require('./tour-detail');
router.use('/tourist/:userId/:tripId', (req, res, next) => {
    const { tripId } = req.params;
    const userId = parseInt(req.params.userId);
    // Check if id is a valid number before setting req.tourId
    const tourId = parseInt(tripId);
    if (!isNaN(tourId)) {
        req.tourId = tourId;
        next();
    } else {
        // Handle the case where id is not a valid number (redirect, send an error response, etc.)
        res.status(400).send("Invalid ID");
    }
}, tourRouter);


router.get("/register",(req, res) => {
    res.render("register");
});

// router.use("/register/:id", (req, res, next) => {
//     const { id } = req.params;
//     // Check if id is a valid number before setting req.tourId
//     const tourId = parseInt(id);
//     if (!isNaN(tourId)) {
//         req.tourId = tourId;
//         next();
//     } else {
//         // Handle the case where id is not a valid number (redirect, send an error response, etc.)
//         res.status(400).send("Invalid ID");
//     }
// }, registertour);

//const regRouter = require("./register");
router.use("/register", (req, res, next) => {
    const { id } = req.query;
    
    // Check if id is a valid number before setting req.tourId
    const tourId = parseInt(id);
    
    if (!isNaN(tourId)) {
        req.tourId = tourId;
        const userId = req.query.userId;
        req.userId = userId;
        next();
    } else {
        // Handle the case where id is not a valid number (redirect, send an error response, etc.)
        res.status(400).send("Invalid ID");
    }
}, regRouter);



module.exports = router;
