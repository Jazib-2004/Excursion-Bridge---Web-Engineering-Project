const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password :process.env.database_password,
    database : process.env.database_name
})


exports.addReview = (req, res) => {
    const { userId, details, stars, comment } = req.body;

    // Use a callback for the database query
    const userQuery = 'SELECT name FROM user WHERE id = ?';
    db.query(userQuery, [userId], (userError, userResults) => {
        if (userError) {
            console.log('User query error:', userError);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        // Check if the user is found
        if (userResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Assuming the user is found
        const touristName = userResults[0].name;

        const reviewDate = new Date(); // Assuming you want to store the review date

        // Assuming you have the travel agency ID from the details: results object
        const travelAgencyId = details.travelagency_id;

        // Insert the review into the database
        const reviewQuery = 'INSERT INTO review (tourist_name, stars, comment, date, travel_agency_id) VALUES (?, ?, ?, ?, ?)';
        db.query(reviewQuery, [touristName, stars, comment, reviewDate, travelAgencyId], (reviewError) => {
            if (reviewError) {
                console.log('Review query error:', reviewError);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            res.status(200).json({ success: true, message: 'Review added successfully' , details: details ,
            userId:userId });
        });
    });
};

exports.getAverageRating = (req, res) => {
    const travelAgencyId = req.params.travelagency_id;

    // Calculate the average star rating for the given travel agency
    const ratingQuery = 'SELECT AVG(stars) AS averageRating FROM review WHERE travel_agency_id = ?';
    db.query(ratingQuery, [travelAgencyId], (error, results) => {
        if (error) {
            console.log('Rating query error:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        // If no reviews found for the agency
        if (results.length === 0 || results[0].averageRating === null) {
            return res.status(404).json({ success: false, message: 'No ratings found for the travel agency' });
        }
        const averageRating = results[0].averageRating;

        res.status(200).json({ success: true, message: 'Average rating retrieved successfully', averageRating  });
    });
};
