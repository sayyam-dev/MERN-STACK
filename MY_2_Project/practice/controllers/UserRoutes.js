const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { error } = require("console");

// This userDataFile variable is used to store the path of user database.
const userDataFile = path.join(__dirname, "userDatabase.json");

// This Function is used for read the user database.
function readDataFromFile() {
  const users = fs.readFileSync(userDataFile);
  return JSON.parse(users);
}

// GET API is used to get all users in database
router.get("/users", (req, res) => {
  const users = readDataFromFile();
  res.send(users);
});

// Get user by Id
router.get("/users/:id", (req, res) => {
  const users = readDataFromFile();
  const userId = req.params.id;

  const user = users.find((user) => user.id == parseInt(userId));
  if (user) {
    res.send(user);
  } else {
    res.status(404);
    res.send({
      Error: "User Not Found",
    });
  }
});

// This function is used for write data in userDatabase.
function WriteDataInFile(data) {
  fs.writeFileSync(userDataFile, JSON.stringify(data, null,2));
}

// Post Api to addde new user
router.post('/users',(req,res)=>{
  const user = req.body;
  const users = readDataFromFile();
  user.id = new Date().getTime();
  users.push(user);
  WriteDataInFile(users);
  res.send(users);

});

// Update Api to update the existing User Data
router.put('/users/:id',(req,res)=>{
  const users = readDataFromFile();
  const userId = req.params.id;
  const upDateUser = req.body;

  const UserIndex = users.findIndex(user => user.id == parseInt(userId));
  if(UserIndex == -1){
    return res.status(404).send({
      error : "User Not Found"
    });
  };

  users[UserIndex] = {
    ...users[UserIndex],
    ...upDateUser
  };

  WriteDataInFile(users);
  res.send(users[UserIndex]);

});

// Delete APi 
router.delete('/users/:id',(req,res)=>{
  const users = readDataFromFile();
  const userId = req.params.id;
  
  const UserIndex = users.findIndex(user => user.id == parseInt(userId));
  if(UserIndex == -1){
    return res.status(404).send({
      error : "User Not Found"
    });
  };

  users.splice(UserIndex,1);
  WriteDataInFile(users);
  res.send({
    message :  `User with id ${userId} has been deleted!`
  })

})



router.get("/", (req, res) => {
  res.send("Welcome to Home Page by using React Router.");
});

module.exports = router;
