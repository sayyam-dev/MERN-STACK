const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const userDatabase = path.join(__dirname,'userDatabase.json');

function ReadDataFromFile() {
    const users = fs.readFileSync(userDatabase);
    return JSON.parse(users);
}

router.get('/users',(req,res)=>{
    const users = ReadDataFromFile();
    res.send(users);
});

router.get('/users/:id',(req,res)=>{
    const users = ReadDataFromFile();
    const UserId = req.params.id;

    const user = users.find(user => user.id == parseInt(UserId));
    if(user == -1){
        res.send({
            message : 'User Not Found Data. 404 Error'
        })
    }else{
        res.send(user)
    }
})


function WriteDataInFile(data) {
    fs.writeFileSync(userDatabase,JSON.stringify(data,null,2));
}


router.post('/users',(req,res)=>{
    const users = ReadDataFromFile();
    const user = req.body;
    user.id = new Date().getTime();
    users.push(user);
    WriteDataInFile(users);
    res.send(users);
})

router.put('/users/:id',(req,res)=>{
    const users = ReadDataFromFile();
    const userId = req.params.id;
    const updateuser = req.body;
    const UserIndex = users.findIndex(user => user.id == parseInt(userId));
    if(UserIndex == -1){
        return res.status(404).send({
            message : "User not found page , 404 Page."
        })
    }

    users[UserIndex] = {
        ...users[UserIndex],
        ...updateuser
    }

    WriteDataInFile(users);
    res.send(users[UserIndex])
})


router.delete('/users/:id',(req,res)=>{
    const users = ReadDataFromFile();
    const userId = req.params.id;

    const userIndex = users.findIndex(user => user.id == parseInt(userId));
    if(userIndex == -1){
       return  res.status(404).send({
         message : "User Not Found Data"   
       })
    }
    users.splice(userIndex);
    WriteDataInFile(users);
    res.send({
         message : `User with id ${userId} has been deleted!`
    })
})


module.exports = router;