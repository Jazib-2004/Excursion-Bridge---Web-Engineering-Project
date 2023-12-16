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
    const { tourId } = req;
    console.log("Tour ID received in detail function:", tourId);

    // Check if tourId is a valid number before using it in the query
    if (!isNaN(tourId)) {
        db.query("SELECT * FROM trip_details WHERE id = ?", [tourId], (error, results) => {
            if (error) {
                console.error("Individual trip details database query error", error);
                res.status(500).send("Internal Server Error");
            } else {
                if (results.length > 0) {
                    console.log(results);
                    res.render("tour_detail", { details: results });
                } else {
                    console.log("There is no such trip");
                    res.status(404).send("Trip Not Found");
                }
            }
        });
    } else {
        // Handle the case where tourId is not a valid number
        res.status(400).send("Invalid Tour ID");
    }
};

exports.register = (req, res) => {
    const { tourId } = req;
    console.log("Tour ID received in register form function:", tourId);

    const fullName = req.body.full_name;
    const phoneNumber = req.body.phone_number;
    const email = req.body.email;
    const relativesContact = req.body.relatives_contact;
    const whatsappNumber = req.body.whatsapp_number;

    db.query('SELECT email FROM registerpage WHERE email = ? and tour_id = ? ', [email , tourId ], async (error, results) => {
        if (error) {
            console.log("register database query error\n");
            console.log(error);
            
        }
        if (results.length > 0) {
            // Email already exists, handle accordingly (send a response, redirect, etc.)
            return res.redirect("/tourist?message=you%20already%20have%20been%20registered");
        } else {
            // Email doesn't exist, proceed with signup
            db.query('INSERT INTO registerpage (full_name, phone_number, email, relatives_contact, whatsapp_number,tour_id) VALUES (?, ?, ?, ?, ?, ?)', [fullName, phoneNumber, email, relativesContact, whatsappNumber ,tourId], (error, results) => {
                if (error) {
                    console.log("register database insert error\n");
                    console.log(error); 
                }
                // return res.render("tourist",{
                //     message : "you have been registered successfully"
                // });
                return res.redirect("/tourist?message=you%20have%20been%20registered%20successfully");

                // Registration successful, handle accordingly (send a response, redirect, etc.)
            });
        }
    });
};
