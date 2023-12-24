//cd server/ npm init expres -y nmp install express mysql dotenv --save nodeman --save-dev cors hbs

const cors = require("cors");
const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("express-handlebars");
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (if needed)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.database_password,
  database: process.env.database_name,
});

db.connect((error) => {
  if (error) {
    console.log("database connection error", error);
  } else {
    console.log("mysql connected...");
  }
});

app.set("view engine", "hbs");

const publicdir = path.join(__dirname, "./public");

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));
// Middleware to parse JSON data
app.use(express.json());

app.use("/", require("./routes/pages"));
app.use(express.static(publicdir));
app.use("/auth", require("./routes/auth"));
// app.use(cors(corsOptions));
const server = app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error("Port 5000 is already in use");
  } else {
    console.error("An error occurred:", error.message);
  }
});
