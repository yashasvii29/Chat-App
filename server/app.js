const express = require('express');
const app = express();
const mongoose = require('mongoose');

// models
const Users = require('./models/User');


// connect DB
const DB_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zw6hky5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_url , {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
})


app.get('/' , (req,res)=>{
    res.send('Welcome to chat-app');
})

app.listen(8080 , (req,res)=>{
    console.log("Server connected at port 8080");
})