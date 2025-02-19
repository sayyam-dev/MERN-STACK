// const express = require('express');
// const app = express();
// const port = 8000;

// app.get('/', (req, res) => {
//     res.status(200)
//   res.send('Hello World!')
// })

// app.get('/about', (req, res) => {
//     res.status(200).send('About Section!')
// })
// app.use((req, res,next) => {
//     res.status(404).send('User Not Found data ! <br/> 404 Page ');
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const app = express();
const port = 7000;

app.get('/',(req,res)=>{
  res.status(200);
  res.send("Home page on port 7000 ");
});

app.get('/about',(req,res)=>{
  res.status(200);
  res.send("About Page on 7000 port");
});

app.use((req,res,next)=>{
  res.status(404);
  res.send('  404 Error <br/> Page not Found');
})

app.listen(port,()=>{
  console.log(`App is listening on this port ${port}`);
});