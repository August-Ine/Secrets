//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

//use body-parser as middleware to handle http request
app.use(bodyParser.urlencoded({ extended: true }));

//set up view engine
app.set('view engine', 'ejs');

//serve public static files
app.use(express.static("public"));

//routes
app.get("/home", (req, res) => {
    res.render("home")
});
app.get("/login", (req, res) => {
    res.render("login")
});
app.get("/register", (req, res) => {
    res.render("register")
});
app.get("/submit", (req, res) => {
    res.render("submit")
});

app.get("/secrets", (req, res) => {
    res.render("secrets")
});


app.listen(3000, function () {
    console.log("server listening on port 3000.")
})

