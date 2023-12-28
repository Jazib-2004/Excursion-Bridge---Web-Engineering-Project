const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password :process.env.database_password,
    database : process.env.database_name
})

exports.getTouristDetails = (req, res) => {
    const tourId = req.params.tourId; 

    db.query('SELECT id, full_name, phone_number, email, relatives_contact, whatsapp_number FROM registerpage WHERE tour_id = ?', [tourId], (error, results) => {
        if (error) {
            console.log("Database query error:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        } else {
            res.status(200).json({ success: true, message: "Tourist details retrieved successfully", tourists: results });
        }
    });
};

//<a href="/touristdetails/{{id}}/tourists">View Tourist Details</a>
