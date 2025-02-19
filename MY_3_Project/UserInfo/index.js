const express = require('express');
const app = express();
const port  = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');
const UserInfo = require('./MODELS/User');

app.use(cors());
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.status(200).send({
        message : "Api is Woking Good. \n Sayyam Shahid"
    });
});



// Get Data Api
app.get('/users',async(req,res)=>{
    const userInfo = await UserInfo.find();
    res.json(userInfo);
});


//Post Data Api
app.post('/adduser',async(req,res)=>{
    const {name,email,age,password,date} = req.body;
    // const {name,email,age} = req.body;
    const userinfo = new UserInfo({
        name,
        email,
        age,
        password,
        date
    });

    const saveduser = await userinfo.save();
    res.json({
        message : "UserInfo Saved Successfully",
        saveduser : saveduser
    })
})




app.listen(port,()=>{
    console.log(`App is runnig on this port ${port}`);
});