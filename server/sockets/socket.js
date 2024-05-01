const { Server } = require("socket.io");

let io;
const users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    console.log(users);
    console.log(socketId);
    const index = users.findIndex((user) => user.socketId === socketId);

    if (index !== -1) {
        users.splice(index, 1);
    }
};

const getUser = (userId) => {
    const matchingUsers = users.filter(user => user.userId === userId);
    return matchingUsers.length > 0 ? matchingUsers[0].socketId : null;
};

const sendMessageToUser = async ({ senderId, receiverId, text }) => {
    const SocketIdUser = getUser(receiverId);
    console.log("User - " + SocketIdUser, senderId, receiverId, text);
    if (SocketIdUser) {
        // console.log(text);
        io.to(SocketIdUser).emit("getMessage", {
            senderId,
            message:text,
        });
    } else {
        console.log("User not found for receiverId: " + receiverId);
    }
};

function setupSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        // when connect
        console.log("a user connected.");

        // take userId and socketId from user
        socket.on("addUser", (userId) => {
            console.log("userId-- " + userId._id, socket.id);
            addUser(userId._id, socket.id);
            console.log(users);
            io.emit("getUsers", users);
        });

        // send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            sendMessageToUser({ senderId, receiverId, text });
        });

        // when disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            removeUser(socket.id);
            console.log(users);
            io.emit("getUsers", users);
        });
    });
}

module.exports = setupSocket;


// const express =  require('express');
// const app = express();
// const http = require('http');
// const Users = require('../models/User');

// const server = http.createServer(app); 

// const path = require('path');
// const socketio = require('socket.io');
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

//     socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
//         const receiver = users.find(user => user.userId === receiverId);
//         const sender = users.find(user => user.userId === senderId);
//         const user = await Users.findById(senderId);
//         console.log('sender :>> ', sender, receiver);
//         if (receiver) {
//             io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
//                 senderId,
//                 message,
//                 conversationId,
//                 receiverId,
//                 user: { id: user._id, username: user.username, email: user.email }
//             });
//             }else {
//                 io.to(sender.socketId).emit('getMessage', {
//                     senderId,
//                     message,
//                     conversationId,
//                     receiverId,
//                     user: { id: user._id, username: user.username, email: user.email }
//                 });
//             }
//         });

//     socket.on('disconnect', () => {
//         users = users.filter(user => user.socketId !== socket.id);
//         io.emit('getUsers', users);
//     });
//     // io.emit('getUsers', socket.userId);
// });
// module.exports = socketio;
// //  



// // localhost:8080/socket.io/socket.io.js  => iss url pr req send krne se client side ki file aa jayegi jo server lakar de rha hai and we can use that code in our app
// // so we will include this path in the index.html file
