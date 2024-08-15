if(process.env.NODE_ENV !==' production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
var cors = require('cors');
const Users = require('./models/User');
const http = require('http');
const { Server } = require("socket.io");
const setUpSocket = require('./sockets/socket')


const authRoutes = require('./routes/apis/authRoutes');
const chatRoutes = require('./routes/apis/chatRoutes');
const messageRoutes = require('./routes/apis/messageRoutes');
const userRoutes = require('./routes/apis/userRoutes');

const dbURL=process.env.dbURL;
mongoose.set('strictQuery',true);
mongoose.connect(dbURL)
.then(()=>{
    // console.log(`DB connected successfully ${mongoose.connection.host}`);
    console.log("db connected successfully");
})
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
})  

app.use(cors({origin:['http://localhost:5173']}));

app.use(express.urlencoded({extended:true})); // form data

app.use(express.json());  // json data

app.use(authRoutes);
app.use(chatRoutes);
app.use(messageRoutes);
app.use(userRoutes);

app.get('/' , (req,res)=>{
    res.send('Welcome to chat-app');
})
// seedDB();
const server = app.listen(8080 , (req,res)=>{
    console.log("Server connected at port 8080");
})
setUpSocket(server)