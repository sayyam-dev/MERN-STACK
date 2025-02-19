const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.Mongo_Url).then(()=>{
    console.log('Database is connected');
}).catch((err)=>{
    console.log(`Error Connecting to Database ` + err );
});


                                                                    