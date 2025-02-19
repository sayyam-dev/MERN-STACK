const http = require('http');
const port = 8000;

const server = http.createServer((req,res)=>{
    if(req.url == '/'|| req.url == '/home' ){
        res.write('<h1 style="color-blue;"> Home Page</h1>');
        res.end;
    }else{
        res.write('<h1 style="color-red;"> 404 Page</h1>')
        res.end;
    }
});

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
