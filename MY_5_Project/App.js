const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./MODELS/UserSchema');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config();
require('./db');

// These all are Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());// Middleware to parse cookies


//Home page Api Testing
app.get('/',(req,res)=>{
    res.status(200).json({
        message : 'Api is Working!'
    });
});


//Error Handling Api : Extually it was an Moddelware
app.use((err,req,res,next)=>{
    console.log("Error Middelware called ", err);
    res.status(500).json({message : err.message});
    
});


// Getting all User Data Api
app.get('/users',async (req,res) => {
    const user = await User.find();
    res.send(user);
});


// User Rejister Api
app.post('/rejister',async (req,res,next) => {
    try {
    const {username,email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(401).json({message : 'User Already Exist.'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    const newUser =  new User({
        username,
        password : hashedpassword,
        email
    });

    const saveUser = await newUser.save();
    res.status(200).json({
        message : "User Rejister Successfully",
        saveUser
    })

    } catch (error) {
        const Error = new Error('Invaide User');
        next(Error);
    }

});


// User Login Api
app.post('/login',async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            const Error = new Error("Invalide Credentials")
        }        

         // Verify password
        const iscorrectPassword = await bcrypt.compare(password,existingUser.password);
        if(!iscorrectPassword){
            const Error = new Error('Invalide Credentials');
            next(Error);
        }

        // Generate tokens
        const accessToken = await jwt.sign({id : existingUser._id},process.env.JWT_SECRET_KEY,{expiresIn : '1h'});
        const refreshToken = await jwt.sign({id : existingUser._id},process.env.JWT_Refresh_SECRET_KEY);
        
        // Save refresh token in the database
        existingUser.refreshToken = refreshToken;
        await existingUser.save();
        
        res.cookie('refreshToken', refreshToken ,{httpOnly : true , path : '/refreshToken'} );

        res.status(200).json({
            accessToken,
            refreshToken,
            message : 'User Login Successfully'
        });

    } catch (error) {
        // const Error = new Error('Invalide User');
        next(error);
    }
    
});


// Getting RefreshToken
app.get('/refreshToken', async(req,res) => {

    // Get refresh token from cookies
    const token = req.cookies.refreshToken;
    if(!token){
        const Error = new Error('Token not Found');
        next(Error);
    }

    // Verify token
    jwt.verify(token,process.env.JWT_Refresh_SECRET_KEY,async (err,decoded) => {
        if(err){
            const Error = new Error('Invalide Token');
            next(Error);
        }

        const id = decoded.id;
        const existingUser = await User.findById(id);
        if(!existingUser || token !== existingUser.refreshToken){
            const error = new Error('Invalid Token');
            next(error);
        }
        
    const accessToken = jwt.sign({id : existingUser._id},process.env.JWT_SECRET_KEY,{expiresIn : '1h'})
                const refreshToken = jwt.sign({id : existingUser._id},process.env.JWT_Refresh_SECRET_KEY);
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



//Funtion for verifying the token
function authenticateToken(req,res,next) {
    
    const token = req.headers.authorization;
    if(!token){
        const Error = new Error('Token not Found');
        next(Error);
    }
    try { 
        const id = req.params.id; // or req.body.id if the ID comes from the body
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(id && decoded.id !== id){
        const error = new Error('Invalid Token');
        next(error);
    }

    req.id = decoded.id;
    next();   

    } catch (err) {
        res.status(500).json({
            message : "Invalide Token"
        })
        next(err);
    }
}

// Geting specfic user id Api
app.get('/getProfile', authenticateToken ,async(req,res)=>{
    const {id} = req.body;
    const user = await User.findById(id);
    res.status(200).json(user);
})


// Api for checking the port 
app.listen(port,()=>{
    console.log(`App is running on following por ${port}`);
});

