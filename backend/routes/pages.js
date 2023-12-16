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
router.use('/tourist', touristRouter);

// // router.use("/tourist/:id", tourRouter)
// router.use("/tourist/:id", (req, res, next) => {

//     const { id } = req.params;
//     console.log(id);
//     req.tourId = id;
//     // Continue to the next middleware
//     next();
// }, tourRouter);

router.use("/tourist/:id", (req, res, next) => {
    const { id } = req.params;
    // Check if id is a valid number before setting req.tourId
    const tourId = parseInt(id);
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

router.use("/register", (req, res, next) => {
    const { id } = req.query;
    
    // Check if id is a valid number before setting req.tourId
    const tourId = parseInt(id);
    
    if (!isNaN(tourId)) {
        req.tourId = tourId;
        next();
    } else {
        // Handle the case where id is not a valid number (redirect, send an error response, etc.)
        res.status(400).send("Invalid ID");
    }
}, regRouter);



module.exports = router;