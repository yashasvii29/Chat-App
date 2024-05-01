const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
var cors = require('cors');
const Users = require('./models/User');
const http = require('http');
const { Server } = require("socket.io");
const setUpSocket = require('./sockets/socket')
// const server = http.createServer(app);
// const io = socketio(server);  

// const users = [];

// // app.use('/', express.static(path.join(__dirname,'public')));
// io.on('connection', socket => {
//     console.log('User connected', socket.id);
//     socket.on('addUser', userId => {
//         const isUserExist = users.find(user => user.userId === userId);
//         if (!isUserExist) {
//             const user = { userId, socketId: socket.id };
//             users.push(user);
//             io.emit('getUsers', users);
//         }
//     });

//     socket.on('sendMessage', async ({ senderId, receiverId, message, chatId }) => {
//         const receiver = users.find(user => user.userId === receiverId);
//         const sender = users.find(user => user.userId === senderId);
//         const user = await Users.findById(senderId);
//         console.log('sender :>> ', sender, receiver);
//         if (receiver) {
//             io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
//                 senderId,
//                 message,
//                 chatId,
//                 receiverId,
//                 user: { id: user._id, username: user.username, email: user.email }
//             });
//             }else {
//                 io.to(sender.socketId).emit('getMessage', {
//                     senderId,
//                     message,
//                     chatId,
//                     receiverId,
//                     user: { id: user._id, username: user.username, email: user.email }
//                 });
//             }
//         });

//     socket.on('disconnect', () => {
//         users = users.filter(user => user.socketId !== socket.id);
//         io.emit('getUsers', users);
//     });

// });
// const sockets = require('./sockets/socket');
// const methodOverride =require('method-override');
const authRoutes = require('./routes/apis/authRoutes');
const chatRoutes = require('./routes/apis/chatRoutes');
const messageRoutes = require('./routes/apis/messageRoutes');
const userRoutes = require('./routes/apis/userRoutes');
// connect DB
// const DB_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zw6hky5.mongodb.net/?retryWrites=true&w=majority`;

// mongoose.connect(DB_url , {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// })
mongoose.connect('mongodb://127.0.0.1:27017/Chatting-App')
.then(()=>{
    console.log("DB connected successfully")
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