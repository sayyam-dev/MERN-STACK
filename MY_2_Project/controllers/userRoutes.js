const { error } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const dataFilePath = path.join(__dirname, '../UserDataBase.json');


function readDataFromFile() {
    const data = fs.readFileSync(dataFilePath);  // the userdatabase is store in this data variable that come from userdatabase.json file
    return  JSON.parse(data);
}

// This api is used to get all user data 
router.get('/users',(req,res)=>{
    const users = readDataFromFile();
    res.send(users);
})

// This api is used to get specific user data 
router.get('/users/:id',(req,res)=>{
    const users = readDataFromFile();
    const userId = req.params.id;

    const user = users.find(user => user.id == parseInt(userId));
        if(user){
            res.send(user);
        }else{
            res.status(404).send({
                error : 'User not Found!'
            });
        }
})



// Post Api Know Stated


function writeDataFromFile(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data,null,2));
}

//  in appendData mode our data will make a new array 
// function appendDataFromFile(data) {
//     fs.appendFileSync(dataFilePath, JSON.stringify(data));
// }

router.post('/users',(req,res)=>{
        const user = req.body;
        
        const users = readDataFromFile(); 
        user.id = new Date().getTime();
        users.push(user);
        // console.log('user',user); 
        writeDataFromFile(users);
        res.send(users);
})



// Update Api know started
router.put('/users/:id',(req,res)=>{
    const users = readDataFromFile();
    const userId = req.params.id;
    const updateUser = req.body;

    const userIndex = users.findIndex(user => user.id == parseInt(userId));
        console.log('userIndex', userIndex);
        if (updateUser == -1) {
            return res.status(404).send({
                error : "User not found!"
            });
        }

            users[userIndex] = {
                ...users[userIndex],
                ...updateUser
            }

        writeDataFromFile(users);
        res.send(users[userIndex])
});


// Delete APi is started from here
router.delete('/users/:id',(req,res)=>{
    const users = readDataFromFile();
    const userId = req.params.id;

    const userIndex = users.findIndex(user => user.id == parseInt(userId));
        if(userIndex == -1){
            return res.status(404).send({
                error : "User not found!"
            });
        }
        users.splice(userIndex,1);
        writeDataFromFile(users);
        res.send({
            message : `User with id ${user.id} has been deleted!`
        })
})



router.get('/test',(req,res)=>res.send({
    message : "Test is working",
    path : dataFilePath
}));


module.exports = router;




 