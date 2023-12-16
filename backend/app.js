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
