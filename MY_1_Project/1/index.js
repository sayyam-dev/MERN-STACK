// const express = require("express");
// const app = express();
// const port = 8000;


// app.get('/',(req,res)=>{
//     res.status(200).send("Hello World");
// })

// app.get('/about',(req,res)=>{
//     res.status(200).send("About page");
// })

// // app.use to call mindelware
// app.use((req,res,next)=>{
//     res.status(404);
//     res.send("<h1>404 Page not found</h1>");
// })
// app.use("*",(req,res)=>{
//     res.status(404).send("<h1>404 Page not found</h1>");
// })

// app.listen(port,()=>{
//     console.log("App listening listening on "+port);
    
// })


const express = require('express');
const app = express();
const port = 8000;

app.get('/',(req,res)=>{
    res.send("Home Page");
})

app.get('/about',(req,res)=>{
    res.send("This our About Section");
});

app.use((req,res,next)=>{
    res.status(404).send("The Page not Found");
});

app.listen(port,()=>{
    console.log(`The app is running on following port : ${port}`);
})