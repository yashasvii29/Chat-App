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
    // Server side code


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
        // Listen for typing event
socket.on('typing', ({ receiverId }) => {
    console.log("typing");
    socket.broadcast.to(receiverId).emit('typing', { senderId: socket.id });
  });
  
  // Listen for stop typing event
  socket.on('stopTyping', ({ receiverId }) => {
    console.log("stop typing");
    socket.broadcast.to(receiverId).emit('stopTyping', { senderId: socket.id });
  });



// // Listen for typing event
// socket.on('typing', ({ receiverId, senderId }) => {
//     io.to(receiverId).emit('typing', { senderId });
//   });

//   socket.on('stopTyping', ({ receiverId, senderId }) => {
//     io.to(receiverId).emit('stopTyping', { senderId });
//   });
  

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



// //  



// // localhost:8080/socket.io/socket.io.js  => iss url pr req send krne se client side ki file aa jayegi jo server lakar de rha hai and we can use that code in our app
// // so we will include this path in the index.html file
