const mongoose = require('mongoose');
const { type } = require('os');

const userInfo = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true
    },
    age : {
        type : Number,
        default : 18,
        min : 18,
        max : 60
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const UserInfo = mongoose.model('UserInfo',userInfo);
module.exports = UserInfo;