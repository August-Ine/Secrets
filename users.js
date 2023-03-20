//imports
require('dotenv').config(); //to access environ variables
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//constants
const dbName = "usersdb";

//db schema 
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    active: Boolean
});

//add passport local mongoose plugin
userSchema.plugin(passportLocalMongoose, {
    // Set usernameUnique to false to avoid a mongodb index on the username column!
    usernameUnique: false,

    findByUsername: function (model, queryParameters) {
        // Add additional query parameter - AND condition - active: true
        queryParameters.active = true;
        return model.findOne(queryParameters);
    }
});

//db model
const User = mongoose.model("user", userSchema);

//connect db
const URI = "mongodb://127.0.0.1:27017/"; // local mongoDB uri

async function connectDb() {
    //connect to db, create db if doesnt exist
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: dbName });
        console.log("Connection to mongodb local host successful.");
        //close connection after test
        //mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}

//module exports
module.exports = {
    User: User,
    connectDb: connectDb
}