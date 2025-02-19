const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
require('dotenv').config();
const app = express();
require('./db');  // importing the db.js file for automaticaling the database
const Todo = require('./MODELS/Todo');  


app.use(bodyParser.json()); // parse application/json
app.use(cors()); // backend can be accessed from anywhere


app.get('/', (req, res) => {
    res.send(`<h1 style="color:green;">Api's Works!</h1>`);
});


app.get('/gettodos',async (req,res) => {
    const alltodos = await Todo.find();
    res.json(alltodos);
})

app.post('/addtodo',async (req,res) => {
    
    const {task , completed} = req.body;

    const todo = new Todo({
        task ,
        completed
    });

    const savedTodo = await todo.save();
    res.json({
        message : 'Todo saved successfully',
        savedTodo : savedTodo
    })


})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
