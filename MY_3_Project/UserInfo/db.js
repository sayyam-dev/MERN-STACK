// const mongoose = require('mongoose');
// require('dotenv').config(); 

// mongoose.connect(process.env.MONGO_URL).then(()=>{
//     console.log('Connected to Database.');
// }).catch((err)=>{
//     console.log(`Error Connecting to Database ${err}`);
// });



const mongoose = require('mongoose');
require('dotenv').config(); // to acccess the mongodb url
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`Connected to DataBase`);   
}).catch((err)=>{
    console.log('Error Connecting to DataBase '+ err );
});
 