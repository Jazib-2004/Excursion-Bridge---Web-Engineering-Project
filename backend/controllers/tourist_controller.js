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
    const userId = req.headers.authorization.split(' ')[1];
    db.query('SELECT * from trip_details', async (error, results) => {
        if (error) {
            console.log("database query of retrieving details error for landing page\n");
            throw error;
        }
        console.log("touristPage.js is successfully rendered");
        // if (results.length > 0 ){
        //     // return res.render("tourist", { trips: results });
        //     return res.render("tourist", { trips: results, message });
        // }
        // else{
        //     return res.send("no trips avaiable");
        // }
        if (results.length > 0) {
            // Assuming 'message' is already defined
            res.status(200).json({
                success: true,
                message: "Data retrieved successfully",
                trips: results,
                userId: userId,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No data found",
            });
        }
        
    });
};


// exports.detail = (req, res, tourid) => {
//     console.log("Tour ID received in detail function:", tourid);
//     const n = parseInt(tourid);
//     console.log(n);
//     console.log("tour id is taken successfully by detail function of tourdetail");
//     db.query("select * from trip_details where id = ?", [n] , async(error,results) => {
//         if(error){
//             console.log("individual trip details database query error\n");
//             console.log(error);
//         }
//         if(results){
//         if(results.length > 0){
//             console.log(results);
//             res.render("tour_detail", { details : results })
//         }else{
//             console.log("there is no such trip here");
//         }}

//     })
//     res.direct
// };

exports.detail = (req, res) => {
   
    const { tourId, userId } = req;
    console.log("Tour ID received in detail function:", tourId);

    // Check if tourId is a valid number before using it in the query
    if (!isNaN(tourId)) {
        db.query("SELECT * FROM trip_details WHERE id = ?", [tourId], (error, results) => {
            if (error) {
                console.error("Individual trip details database query error", error);
                res.status(500).send("Internal Server Error");
            } else {
                // if (results.length > 0) {
                //     console.log(results);
                //     res.render("tour_detail", { details: results });
                // } else {
                //     console.log("There is no such trip");
                //     res.status(404).send("Trip Not Found");
                // }
                if (results.length > 0) {
                    console.log(results);
                    res.status(200).json({ success: true, message: "Details retrieved successfully",
                     details: results,
                     userId: userId,
                     });

                } else {
                    console.log("There is no such trip");
                    res.status(404).json({ success: false, message: "Trip Not Found" });
                }
                
            }
        });
    } else {
        // Handle the case where tourId is not a valid number
        res.status(400).send("Invalid Tour ID");
    }
};

// exports.register = (req, res, tourId, userId) => {
//     const { tourId, userId } = req;
//     console.log("Tour ID received in register form function:", tourId);

//     const fullName = req.body.full_name;
//     const phoneNumber = req.body.phone_number;
//     const email = req.body.email;
//     const relativesContact = req.body.relatives_contact;
//     const whatsappNumber = req.body.whatsapp_number;

//     db.query('SELECT email FROM registerpage WHERE email = ? and tour_id = ? ', [email , tourId ], async (error, results) => {
//         if (error) {
//             console.log("register database query error\n");
//             console.log(error);
            
//         }
//         if (results.length > 0) {
//             // Email already exists, handle accordingly (send a response, redirect, etc.)
//             return res.redirect("/tourist?message=you%20already%20have%20been%20registered");
//         } else {
//             // Email doesn't exist, proceed with signup
//             db.query('INSERT INTO registerpage (full_name, phone_number, email, relatives_contact, whatsapp_number,tour_id) VALUES (?, ?, ?, ?, ?, ?)', [fullName, phoneNumber, email, relativesContact, whatsappNumber ,tourId], (error, results) => {
//                 if (error) {
//                     console.log("register database insert error\n");
//                     console.log(error); 
//                 }
//                 // return res.render("tourist",{
//                 //     message : "you have been registered successfully"
//                 // });
//                 return res.redirect("/tourist?message=you%20have%20been%20registered%20successfully");

//                 // Registration successful, handle accordingly (send a response, redirect, etc.)
//             });
//         }
//     });
// };

exports.register = (req, res, tourId, userId) => {
    const fullName = req.body.full_name;
    const phoneNumber = req.body.phone_number;
    const email = req.body.email;
    const relativesContact = req.body.relatives_contact;
    const whatsappNumber = req.body.whatsapp_number;

    // Check if the user has already registered for the tour
    db.query('SELECT id FROM registerpage WHERE email = ? AND tour_id = ?', [email, tourId], async (error, results) => {
        if (error) {
            console.log("Register database query error");
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }

        if (results.length > 0) {
            // User has already registered, handle accordingly
            return res.status(400).json({ success: false, message: "You have already been registered" });
        }

        // User is not registered, proceed with signup
        db.query('INSERT INTO registerpage (full_name, phone_number, email, relatives_contact, whatsapp_number, tour_id) VALUES (?, ?, ?, ?, ?, ?)',
            [fullName, phoneNumber, email, relativesContact, whatsappNumber, tourId], (error, insertResults) => {
                if (error) {
                    console.log("Register database insert error");
                    console.log(error);
                    return res.status(500).json({ success: false, message: "Internal Server Error" });
                }

                // Registration successful, now retrieve the travel agency ID
                db.query('SELECT travelagency_id FROM trip_details WHERE id = ?', [tourId], (error, travelAgencyResults) => {
                    if (error) {
                        console.log("Trip details database query error");
                        console.log(error);
                        return res.status(500).json({ success: false, message: "Internal Server Error" });
                    }

                    if (travelAgencyResults.length === 0) {
                        console.log("No trip details found for the provided tourId");
                        return res.status(404).json({ success: false, message: "No trip details found for the provided tourId" });
                    }

                    const travelAgencyId = travelAgencyResults[0].travelagency_id;

                    // Insert into the connection table
                    db.query('INSERT INTO connection_table (register_id, tourist_id, travel_agency_id) VALUES (?, ?, ?)',
                        [insertResults.insertId, userId, travelAgencyId], (error) => {
                            if (error) {
                                console.log("Connection table database insert error");
                                console.log(error);
                                return res.status(500).json({ success: false, message: "Internal Server Error" });
                            }

                            // Insert into the tourist table
                            db.query('INSERT INTO tourist (user_id, trip_id) VALUES ( ?, ?)',
                                [userId, tourId, /* Add your values here if needed */, userId, tourId], (error) => {
                                    if (error) {
                                        console.log("Tourist table database insert error");
                                        console.log(error);
                                        return res.status(500).json({ success: false, message: "Internal Server Error" });
                                    }

                                    // Registration and connection table update successful
                                    return res.status(200).json({
                                        success: true,
                                        message: "You have been registered successfully",
                                        registerId: insertResults.insertId,
                                        travelAgencyId: travelAgencyId,
                                    });
                                });
                        });
                });
            });
    });
};



