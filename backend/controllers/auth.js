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
    db.query("SELECT email,password from user where email = ? and role = ?" , [email , role] ,async (error,results) => {
        if(error){
            console.log("login database query error\n");
            console.log(error);
        }
        if(results.length === 0 ){
            return res.render("login",{
                message : "you havenot signed up yet"
            })
        }
        
        const user = results[0]; // Access the first object in the results array

        if (password !== user.password) {
            return res.render("login",{
                message : "password is incorrect"
            })
        }else{

            return res.redirect("/tourist");
        }

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
            return res.render("signup",{
                message : "email is already in use"
            })
        }else if(password !== confirmpassword) {
            return res.render("signup",{
                message : "password is not equal to confirm password"
            });
        }
        let hashpass = await bcrypt.hash(password, 6);
        db.query("INSERT INTO user SET ?", {name : name , email : email , password : password , role : role} , (error , result) => {
            if(error){
                console.log("sign up database insertion error\n");
                console.log(error);
            }else{
                let mailSubject = "Mail verification";
                const randomToken = randomstring.generate();
                let content = '<p>Hi ' + req.body.name +' </hr> Thanks for signing up </br> please <a href="http://localhost:5000/mail-verification?token=' + randomToken+ "> verify</a> your mail</p> ";
                sendMail(req.body.email,mailSubject,content);
                return res.redirect("/tourist");
            }

        })
    })
}