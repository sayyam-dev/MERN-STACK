const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRouters = require('./controllers/test');

app.use(bodyParser.json());
app.use(cors());
app.use('/userDetails',UserRouters);


app.get('/',(req,res)=>{
    res.send({
        message : "This is home page of app"
    })
})

app.listen(port,()=>{
    console.log('The app is running on following port'+port);
    
})