const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { error } = require('console');


const userDataFile = path.join(__dirname,"userDatabase.json");

function readDataFromFile() {
    const users = fs.readFileSync(userDataFile);
    return JSON.parse(users);
}


router.get('/users',(req,res)=>{
    const users = readDataFromFile();
    res.send(users);
});


router.get('/users/:id',(req,res)=>{
    const users = readDataFromFile();
    const userId = req.params.id;

    const user = users.find(user => user.id == parseInt(userId));
    if(user == -1){
        res.status(404).send({
            message : "User Not Found"
        })
    }else{
        res.send(user);
    }
});


function WriteDataInFile(data) {
    fs.writeFileSync(userDataFile,JSON.stringify(data,null,2));
};


router.post('/users',(req,res)=>{
    const users = readDataFromFile();
    const user = req.body;
    user.id = new Date().getTime();
    users.push(user);
    WriteDataInFile(users);
    res.send(users);
})


router.put('/users/:id',(req,res)=>{
    const users = readDataFromFile();
    const userId = req.params.id;
    const updateUser = req.body;
    const UserIndex = users.findIndex(user => user.id == parseInt(userId));
    if(UserIndex == -1){
       return res.status(404).send({
        error : "User Not Found"
       });
    };

    users[UserIndex] = {
        ...users[UserIndex],
        ...updateUser
    };

    WriteDataInFile(users);
    res.send(users[UserIndex])
});


router.delete('/user/:id',(req,res)=>{
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
        message : `User with id ${userId} has been deleted!`
    })

});

module.exports = router;