const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password :process.env.database_password,
    database : process.env.database_name
})

exports.deleteTrip = (req, res) => {
    const tripId = req.params.tripId;

    db.query('SELECT travelagency_id FROM trip_details WHERE id = ?', [tripId], (error, results) => {
        if (error) {
            console.log('Database query error:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                const userId = results[0].travelagency_id;
            } else {
                res.status(404).json({ success: false, message: 'Trip not found' });
            }
        }
    });

    db.query('DELETE FROM trip_details WHERE id = ?', [tripId], (error, results) => {
        if (error) {
            console.log('Database query error:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            res.status(200).json({ success: true, message: 'Trip deleted successfully' });
        }
    });
};

// Controller for adding a new trip
exports.addTrip = (req, res) => {
    const { img, date, date_of_posting, price, no_of_days_in_trip, description, destination } = req.body;
    const userId = req.params.userId;
    
    db.query(
        'INSERT INTO trip_details (img, date, date_of_posting, price, no_of_days_in_trip, description, destination, travelagency_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [img, date, date_of_posting, price, no_of_days_in_trip, description, destination, userId],
        (error, results) => {
            if (error) {
                console.log('Database query error:', error);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true, message: 'Trip added successfully', userId: userId });
            }
            
        }
    );
};

// Controller for editing a trip
exports.editTrip = (req, res) => {
    const tripId = req.params.tripId;
    const { img, date, date_of_posting, price, no_of_days_in_trip, description, destination } = req.body;
   
    db.query('SELECT travelagency_id FROM trip_details WHERE id = ?', [tripId], (error, results) => {
        if (error) {
            console.log('Database query error:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                const userId = results[0].travelagency_id;
            } else {
                res.status(404).json({ success: false, message: 'Trip not found' });
            }
        }
    });
    db.query(
        'UPDATE trip_details SET img=?, date=?, date_of_posting=?, price=?, no_of_days_in_trip=?, description=?, destination=? WHERE id=?',
        [img, date, date_of_posting, price, no_of_days_in_trip, description, destination, tripId],
        (error, results) => {
            if (error) {
                console.log('Database query error:', error);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {
                res.status(200).json({ success: true, message: 'Trip updated successfully', userId : "userId" });
            }
        }
    );
};
//   PUT request to the /trips/edit/:tripId
//   axios.put('/trips/edit/123', { /* Updated trip data */ })
//  .then(response => {
//     console.log(response.data); // Handle the response as needed
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//  
