const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
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


module.exports = mongoose.model('User',UserSchema);