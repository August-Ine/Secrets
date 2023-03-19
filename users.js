//imports
require('dotenv').config(); //to access environ variables
const mongoose = require("mongoose");

//constants
const dbName = "usersdb";

//db schema 
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

//db model
const User = mongoose.model("user", userSchema);

//module exports
module.exports = {
    User: User,
    dbName: dbName,
    userSchema: userSchema
}