const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password :process.env.database_password,
    database : process.env.database_name
})


exports.getTrips = (req, res) => {
    const userId = req.params.userId; 
    db.query('SELECT * FROM trip_details WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.log("Database query error:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        } else {
            res.status(200).json({ success: true, message: "Trips retrieved successfully" , userId: userId, trips: results });
        }
    });
};
