//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./users");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

//use body-parser as middleware to handle http request
app.use(bodyParser.urlencoded({ extended: true }));

//set up view engine
app.set('view engine', 'ejs');

//serve public static files
app.use(express.static("public"));

//test db connection
const URI = "mongodb://127.0.0.1:27017/"; // local mongoDB uri
async function testDb() {
    //connect to db, create db if doesnt exist
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: users.dbName });
        console.log("Connection to mongodb local host successful.");
        //close connection after test
        //mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}
testDb();

//routes
//root
app.get("/", (req, res) => {
    res.render("home");
});

//login
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    try {
        const foundUser = await users.User.findOne(
            { email: req.body.username }
        );
        if (foundUser) {
            //if user exists check if hash of submitted password matches stored hash
            bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
                if (!err) {
                    if (result == true) {
                        //password matches
                        res.redirect("/secrets");
                    } else {
                        //wrong password
                        console.log("Wrong password");
                        res.send("Wrong password");
                    }
                } else {
                    console.log(err);
                    res.send(err);
                }
            });
        } else {
            console.log("user not found", req.body.username);
            res.send("user not found");
        }
    } catch (e) {
        console.log(e);
    }
});

//register
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    //generate salted hash using bcrypt
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            // create user document with password hash
            const newUser = new users.User({
                email: req.body.username,
                password: hash //store the hash of the password
            });
            //save new user to db
            try {
                await newUser.save();
                res.redirect("/secrets");
            } catch (e) {
                console.log(e);
                res.send(e);
            }
        }
    });
});

//submit
app.get("/submit", (req, res) => {
    res.render("submit");
});

//secrets
app.get("/secrets", (req, res) => {
    res.render("secrets");
});


app.listen(3000, function () {
    console.log("server listening on port 3000.")
})

