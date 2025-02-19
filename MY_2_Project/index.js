const express = require('express');
const app = express();
const PORT = 8000;
const userRoutes = require('./controllers/userRoutes');
const cors = require('cors');   // These are packages that we install 
const bodyParser = require('body-parser');   // These are packages that we install 
const path=require('path')
const fs = require('fs');


app.use(bodyParser.json());
// cors - localhost:3000 , localhost:3001
// const allowedOrigins = ['http://localhost:3000/','http://localhost:3001/'];

// app.use(cors({
//     origin: function (origin,callback) {
//         if(!origin) return callback(null,true);
//         if(allowedOrigins.includes(origin)) return callback(null,true);
//         else{
//             return callback(new Error ('Not allowed by CORS.'));
//         }  
//     }
// })) 


app.use(cors());
app.use('/userapis',userRoutes);


function getUsers(req,res){
    const dataFilePath = path.join(__dirname, './UserDataBase.json');
    
     const data = fs.readFileSync(dataFilePath);  // the userdatabase is store in this data variable that come from userdatabase.json file
    var    data_json=JSON.parse(data)
    res.send(data_json)
}

app.get('/users',getUsers)


app.get('/',(req,res)=>{    
    res.send({
        message : " The Api is Working!",
        title : "Hello World"
    });
    res.end;
});


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}.`);
})