//cd server/ npm init expres -y nmp install express mysql dotenv --save nodeman --save-dev cors hbs

const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("express-handlebars");

dotenv.config({path : "./.env"});

const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password :process.env.database_password,
    database : process.env.database_name
})

db.connect((error) =>{

    if (error){
        console.log("database connectionj error")
    }
    else{
        console.log("mysql connected...")
    }
})

app.set("view engine","hbs");

const publicdir = path.join(__dirname,"./public");

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));
// Middleware to parse JSON data
app.use(express.json());

app.use("/",require("./routes/pages"));
app.use(express.static(publicdir));
app.use("/auth",require("./routes/auth"));

app.use('/search', require("./routes/search"));
//    /search/getToursByDate/:userId/:date
//    /search/getToursByDestination/:userId/:destination
//    /search/getToursByCost/:userId/:cost

// for register post method 
//`/register?id=${tourId}&userId=${userId}`

//route to get to landing page for travel agency which will show all the trips he had added before
app.use('/travelagency/:userId', require("./routes/travel_agency"));
//`/travelagency/${userId}/tripsofagency`

app.use('/touristdetails',  require("./routes/touristdetail"));
// to get users details for a specific trip   --trip id should be provided 
//"/touristdetails/{{id}}/tourists"

//getting the detail of a specific trip by a tourist 
//`/tourist/${userId}/${tourId}`


const tripRoutes = require('./routes/tripRoutes');

//to add a trip
//there should be <input type = hidden value= "userId"> -- so i could get the userId
//in the add page again  <input type = hidden value= "userId">
//fetch url  is '/trips/add'

//fetch url /trips/delete/${tripIdToDelete}`
//delete a specific trip
//require trip id in button form from frontend as <input type=hidden value=trip.id> as trips are already provided 

//edit a trip
//fetch url /trips/edit/${tripIdToDelete}

app.use('/trips', tripRoutes);


//to add review fetch url is "/reviews/add"
//need <input type = hidden value= "userId">
//need <input type = hidden value= "details"> which is provided to client by trip detail method

//to get review fetch is "/reviews/averageRating"
const reviewsRoutes = require('./routes/reviewsRoutes');
app.use('/reviews', reviewsRoutes);


const server = app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error('Port 5000 is already in use');
    } else {
        console.error('An error occurred:', error.message);
    }
});
