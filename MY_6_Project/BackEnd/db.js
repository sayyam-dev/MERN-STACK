const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`Database is Connected Succcessfully`);
}).catch((err)=>{
    console.log('Error Conneting to Database.'+err);
})
