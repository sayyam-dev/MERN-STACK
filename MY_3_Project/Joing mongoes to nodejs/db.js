// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL).then(()=>{
//     console.log('Connected to database!');
// })
// .catch((err)=>{
//     console.log('Error connecting to database ' + err);
    
// })


const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Database!');
}).catch((err)=>{
        console.log('Error connecting to database ' + err);

}); 