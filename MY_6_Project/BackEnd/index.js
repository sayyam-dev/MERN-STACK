
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./MODELS/UserSchema');
require('./db');

//Use Middelware
app.use(cors());
app.use(bodyparser.json());
app.use(cookieParser());


//Home page Api Testing
app.get('/', (req, res) => {
    res.status(200).json({
        message: "The Api is Working"
    })
});


//All Users Api
app.get('/users', async (req, res) => {
    const user = await User.find();
    res.send(user);
});


// User Rejister Api
app.post('/rejister', async (req, res) => {
    try {
        const { username, email, password, age, gender } = req.body;
        const exsitingUser = await User.findOne({ email });
        if (exsitingUser) { return res.status(500).send({ message: 'User Already Exits!' }) }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashpassword,
            age,
            gender
        });

        const saveUser = await newUser.save();
        res.status(200).json({
            message: "User Rejister Successfully",
            saveUser
        })
    } catch (error) {
        res.status(400).send(error);
    }
})


// User Login Api
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) { return res.status(500).json({ message: "Invalide User" }) }

    const iscorrectpassword = await bcrypt.compare(password, existingUser.password);
    if (!iscorrectpassword) { return res.status(500).json({ message: "Invalide User" }) }

    const token = await jwt.sign({ id: existingUser._id }, process.env.JWT_SECRECT_KEY, { expiresIn: "1h" });
    res.status(200).json({
        message: "Successfully User Login",
        token
    });

});


//Funtion for verifying the token
function authenticateToken(req, res, next) {

    const token = req.headers.authorization;
    if (!token) {
        return res.send("Token not Found");
    }
    try {
        const id = req.params.id; // or req.body.id if the ID comes from the body
        const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
        if (id && decoded.id !== id) {
            return res.json("Invalid Token")
        }

        req.id = decoded.id;
        next();

    } catch (err) {
        res.status(500).json({
            message: "Invalide Token"
        })
        next(err);
    }
}

// Geting specfic user id Api 
app.get('/getProfile', authenticateToken, async (req, res) => {
    const { id } = req.body;
    const user = await User.findById(req.id);
    res.status(200).json(user);
})



// Api for checking the port 
app.listen(port, () => {
    console.log("App is running on this port : " + port);

})