const express = require('express');
const app = express();                                                                                                    
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');
const User = require('./MODELS/UserSchema'); // importing the schema
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
                                                                                    

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.status(200).send({
        message : "Home Page, Api Works"
    });
});


// Get Api
app.get('/users',async(req,res)=>{
    const alluser = await User.find();
    res.send(alluser);
})

// Rejister Api
app.post('/rejister',async(req,res)=>{
    try{
        const {username, password, email, age, gender} = req.body;
        const exitingUser = await User.findOne({email}); // in this line they find the email is unique exit or not

        if(exitingUser){
          return  res.status(409).json({ message : "Email Already Exits" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            username ,
            password : hashedPassword,
            email,
            age,
            gender
        });

        const saveUser = await newUser.save();
        res.status(200).json({
            message : "User Rejister Successfully",
            saveUser : saveUser
        })

    }
    catch(err){
        res.status(500).json({
            message : err.message  
        })
    }
});



// Login Api

app.post('/login',async (req,res) => {
    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(401).json({message : "Invalid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({message : "Invalid Credentials"});     
        }

        const token = jwt.sign({id : existingUser._id},process.env.JWT_SECRET_KEY ,{expiresIn : '1h'});
        res.status(200).json({
            token,
            message : "User Login Successfully"
        });
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
})


//Function to verifying the token
function authenticateToken(req,res,next) {
    const token = req.headers.authorization;
    if(!token){return res.status(401).json({message : 'Auth Error'})}

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.id = decoded.id;
        next();

    } catch (err) {
        console.log(err);
        res.status(501).json({message : "Invalid Token"});
    }
}

// Getting spcific profileby id api
app.get('/getmyprofile',authenticateToken,async(req,res,next)=>{
    const {id} = req.body;
    const user = await User.findById(id);
    res.status(200).json({user})
})


app.listen(port,()=>{
    console.log(`App is running on following port : ${port}`);
});