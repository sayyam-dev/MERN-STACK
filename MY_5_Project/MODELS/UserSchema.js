const mongoose = require('mongoose');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String
    },
    refreshToken :{
        type : String
    }

});


module.exports = mongoose.model('User',UserSchema);






// const mongoose = require('mongoose');
// require('dotenv').config();

// const UserSchema = new mongoose.Schema({
//     username : {
//         type : String,
//         required : true
//     },
//     email : {
//         type : String,
//         unique : true,
//         required : true
//     },
//     password : {
//         type : String,
//         required : true
//     },
//     refreshToken : {
//         type : String
//     }
// });

// module.exports = mongoose.model('User',UserSchema);