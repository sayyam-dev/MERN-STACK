const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./db');
const User = require('./MODELS/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.status(200).send({
        message : 'Home Page'
    });
});


// All User
app.get('/users',async(req,res)=>{
    const user = await User.find();
   res.send(user)
})


// Rejister Api
app.post('/rejister',async(req,res)=>{
   try {
    const {username,email,password} = req.body;
    const exitingUser = await User.findOne({email});
    if(exitingUser){
        return res.status(409).json({ message : "Email Already Exits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    const newUser = new User({
        username,
        password : hashedpassword,
        email
    });

    const saveUser = await newUser.save();
    res.status(200).send({
        message : "User Rejister Successfully",
        saveUser
    })
   } catch (err) {
    res.status(500).json({
        message : err.message  
    })
   }

});

// Login Api
app.post('/login',async (req,res,next)=>{
   try {
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser){ 
        // return res.status(401).json({message : "Invalid Credentials"});
        const error = new Error('User did not exist');
        next(error);
    }

    const correctpassword = await bcrypt.compare(password,existingUser.password);
    if(!correctpassword){ 
        // return res.status(401).json({message : "Invalid Credentials"});
        const error = new Error('Invalid Credentials');
        next(error); // its call the error handlying midleware
    }

    const accessToken =  jwt.sign({id : existingUser._id},process.env.JWT_SECRET_KEY,{expiresIn : '1h'});

    const refreshToken =  jwt.sign({id : existingUser._id},process.env.JWT_Refresh_SECRET_KEY);
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie('refreshToken',refreshToken,{httpOnly : true, path : '/refreshToken'});

    res.status(200).json({
        accessToken,
        refreshToken,
        message : "User Login Successfully"
    });

   } catch(err){
    res.status(500).json({
        message : err.message
    })
}
});

// Getting RefreshToken
app.get('/refreshToken',async(req,res,next)=>{
    const token = req.cookies.refreshToken;
    // res.send(token);
    if(!token){
        const Error = new Error("Token not Found");
        next(Error);
    }

    jwt.verify(token,process.env.JWT_Refresh_SECRET_KEY,async (err,decoded) => {
        if(err){
            const Error = new Error('Invalide Token');
            next(Error);
        }
        const id = decoded.id;
        const existingUser = await User.findById(id);
        //if the existingUser and the token in cokies is not match with token store in database
        if(!existingUser || token !== existingUser.refreshToken){
            const error = new Error('Invalid Token');
            next(error);
        }

        const accessToken = jwt.sign({id : exitingUser.id},process.env.JWT_SECRET_KEY,{expiresIn : '1h'})
        const refreshToken = jwt.sign({id : exitingUser.id},process.env.JWT_Refresh_SECRET_KEY);
        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/refreshToken' });


        res.status(200).json({
        accessToken,
        refreshToken,
        message : "Token Refreshed Successfully"
    });

    })
})


// // Function to verifying the token
// function authenticateToken(req,res,next){
//     const token = req.headers.authorization;
//     if(!token){
//         // return res.status(400).json({ message : "Auth Error"})

//         const error = new Error('Token not Found');
//         next(error);// its automatically call the error handlying midleware
//     }

//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
//         // if(id && decoded.id !== id){
//         //     const error = new Error('Invalid Token');
//         //     next(error);
//         // }
//         req.id = decoded.id;
//         next();
//     } catch (err) {
//         // res.status(501).json({
//         //     message : 'Invalid Token'
//         // });
//         next(err);
//     }
// }



// Function to verifying the token
function authenticateToken(req,res,next){
    const token = req.headers.authorization;
    if(!token){
        // return res.status(400).json({ message : "Auth Error"})

        const error = new Error('Token not Found');
        next(error);// its automatically call the error handlying midleware
    }

    try {
        const id = req.params.id; // or req.body.id if the ID comes from the body
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // if(id && decoded.id !== id){
        //     const error = new Error('Invalid Token');
        //     next(error);
        // }
        req.id = decoded.id;
        next();
    } catch (err) {
        // res.status(501).json({
        //     message : 'Invalid Token'
        // });
        next(err);
    }
}


// Getting specific profile of user
app.get('/getprofile', authenticateToken, async(req,res)=>{
        const {id} = req.body;
        const user = await User.findById(id);
        res.status(200).json({user,});

});


//Error Handling Middelware
app.use((err,req,res,next)=>{
    console.log("Error Middelware called ", err);
    res.status(500).json({message : err.message});
    
})
    


app.listen(port,()=>{
    console.log(`App is running on ${port} port.`);
});
