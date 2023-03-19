//imports
require('dotenv').config(); //to access environ variables
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

//constants
const dbName = "usersdb";

//db schema 
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

//add encrypt plugin to schema
userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

//db model
const User = mongoose.model("user", userSchema);

//module exports
module.exports = {
    User: User,
    dbName: dbName,
    userSchema: userSchema
}