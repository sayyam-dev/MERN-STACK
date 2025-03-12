const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
});

module.exports = mongoose.model('User', userSchema);