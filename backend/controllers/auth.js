const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const randomstring = require("randomstring");
const sendMail  = require("./send_mail");


const db = mysql.createConnection({
    host : process.env.database_host,
    user : process.env.database_user,
    password :process.env.database_password,
    database : process.env.database_name
})


exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    db.query("SELECT id, email, password FROM user WHERE email = ? AND role = ?", [email, role], async (error, results) => {
        if(error){
            console.log("login database query error\n");
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
        if(results.length === 0 ){
            // return res.render("login",{
            //     message : "you havenot signed up yet"
            // })
            return res.status(401).json({ success: false, message: "You have not signed up yet",redirectUrl: "/login" });
        }
        
        const user = results[0]; // Access the first object in the results array
        const bcrypt = require('bcrypt');
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                // Handle error
                // return res.render("login", { message: "Error comparing passwords" });
                return res.status(500).json({ success: false, message: "Internal Server Error",redirectUrl: "/login" });
            }
        
            if (isMatch) {
                // Passwords match, user is authenticated
                // Redirect to a success page or perform other actions
                // return res.redirect("/tourist");
                res.status(200).json({
                    success: true,
                    message: "Logged in",
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                    redirectUrl: "/tourist",
                });
            } else {
                // Passwords don't match, show an error message
                return res.render("login", { message: "Password is incorrect" });
            }
        });
        
       

    })
}

exports.signup = (req,res) => {
    const email = req.body.email;
    const name = req.body.name;
    const role = req.body.role;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    db.query('SELECT email from user where email = ?' , [email],async (error,results) =>{
        if(error){
            console.log("signup database query error\n");
            console.log(error);
        }
        if(results.length > 0 ){
            // return res.render("signup",{
            //     message : "email is already in use"
            // })
            res.status(403).json({
                success: false,
                message: "User already exists"
              })
        }else if(password !== confirmpassword) {
            // return res.render("signup",{
            //     message : "password is not equal to confirm password"
            // });
            res.status(403).json({
                success: false,
                message: "Password doesn't match"
              })
        }
        let hashpass = await bcrypt.hash(password, 6);
        db.query("INSERT INTO user SET ?", {name : name , email : email , password : hashpass , role : role} , (error , result) => {
            if(error){
                console.log("sign up database insertion error\n");
                console.log(error);
            }else{
                let mailSubject = "Mail verification";
                const randomToken = randomstring.generate();
                let content = '<p>Hi ' + req.body.name +' </hr> Thanks for signing up </br> please <a href="http://localhost:5000/mail-verification?token=' + randomToken+ "> verify</a> your mail</p> ";
                sendMail(req.body.email,mailSubject,content);
                // return res.redirect("/tourist");
                res.status(200).json({
                    success: true,
                    message: "registered",
                    redirectUrl: "/tourist",
                  });
            }

        })
    })
}
