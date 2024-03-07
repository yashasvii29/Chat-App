const express =  require('express');
const app = express();
const http = require('http');

const server = http.createServer(app); 

const path = require('path');
const socketio = require('socket.io');
const io = socketio(server);  
const users = {};

// app.use('/', express.static(path.join(__dirname,'public')));
io.on('connection',(socket)=>{
    console.log(`connection established at ${socket.id} `);
    
    socket.on('send-msg',(data)=>{   
      
            io.emit('received-msg',{ 
            msg: data.msg,
            // id:socket.id,
            username:users[socket.id]

        })
    })  

    socket.on('login',(data)=>{ 
        // console.log(data);
        users[socket.id]=data.username;  
})

})






const port = process.env.PORT || 8080;
server.listen(port, () => 
        console.log(`Server connected at port ${port}`)
    );




// localhost:8080/socket.io/socket.io.js  => iss url pr req send krne se client side ki file aa jayegi jo server lakar de rha hai and we can use that code in our app
// so we will include this path in the index.html file
