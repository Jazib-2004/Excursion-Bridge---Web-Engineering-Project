const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password :process.env.database_password,
    database : process.env.database_name
})


exports.tourist = (req,res) => {
    const message = req.query.message;
    db.query('SELECT * from trip_details', async (error, results) => {
        if (error) {
            console.log("database query of retrieving details error for landing page\n");
            throw error;
        }
        console.log("touristPage.js is successfully rendered");
        if (results.length > 0 ){
            // return res.render("tourist", { trips: results });
            return res.render("tourist", { trips: results, message });
        }
        else{
            return res.send("no trips avaiable");
        }
    });
};
