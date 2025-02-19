    const express = require('express');
    const app = express();
    const port = 8000;
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const userRoutes = require("./controllers/UserRoutess");

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/userDetails',userRoutes);


    app.get("/",(req,res)=>{
        res.send({
            message : "This api works",
            title : "Home Page"
        });
        res.end;
        // res.send("Home page");
    });

    // For checking the bodyParser
    app.get("/data",(req,res)=>{
        console.log(req.body);  // Access parsed JSON data
        res.send('Data received'); 
    });

    app.use((req,res,next)=>{
        res.status(404).send({
            message : "User Not Found Page"
        })
    })

    //For checking the cors
    app.get("/cors",(req,res)=>{
        res.json({ message: 'This is CORS-enabled data!' });
    });

    app.listen(port,()=>{
        console.log(`Server running on port : ${port}`);
    });