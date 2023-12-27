
const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password :process.env.database_password,
    database : process.env.database_name
})

exports.getToursByDate = (req, res) => {
    const date = req.params.date;
    const userId = req.params.userId;
 
    db.query('SELECT * FROM tours WHERE date = ?', [date], (error, results) => {
        if (error) {
            console.log("Database query error:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        } else {
            res.status(200).json({ success: true, message: "Tours retrieved successfully", tours: results ,userId: userId,});
        }
    });
};

exports.getToursByDestination = (req, res) => {
    const destination = req.params.destination;
    const userId = req.params.userId;
   
    db.query('SELECT * FROM tours WHERE destination = ?', [destination], (error, results) => {
        if (error) {
            console.log("Database query error:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        } else {
            res.status(200).json({ success: true, message: "Tours retrieved successfully", tours: results,userId: userId, });
        }
    });
};

exports.getToursByCost = (req, res) => {
    const cost = req.params.cost;
    const userId = req.params.userId;
  
    db.query('SELECT * FROM tours WHERE price = ?', [cost], (error, results) => {
        if (error) {
            console.log("Database query error:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        } else {
            res.status(200).json({ success: true, message: "Tours retrieved successfully", tours: results,userId: userId, });
        }
    });
};
