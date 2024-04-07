const express = require('express');
const User = require('../../models/User');
const Message  = require('../../models/Message');
const Chat = require('../../models/Chat');
const router = express();

// to get the messages of other person
router.get('/:id ',async (req, res) => {
    try{
        const {otherPersonChatId} = req.params;  // dusre person ki chatid aa jayegi
        const senderId = req.user._id;
        const chat = await Chat.findOne({
            participants:{$all:[senderId,otherPersonChatId]},
        }).populate("messages"); // not reference but actual message

        if(!chat){
            return res.status(200).json([]);
        }
        const messages = chat.messages;
        res.status(200).json(messages);
     }
        catch(e){
            console.log("error in getting messages",e.message);
            res.status(400).json({msg:'something went wrong'});
        } 
})
// to send message to someone
router.post('send/:id', async (req,res)=>{
    try{
        const {message}= req.body;
        const {receiverId} = req.params;
        const senderId = req.user._id;
        let chat = await Chat.findOne({
            participants:{$all : [senderId,receiverId]},
        });
        if(!chat){
            chat = await  Chat.create({
                participants:[senderId,receiverId],
            });
        }
        const newMsg = new Message({senderId,receiverId});
        await chat.save();
        await newMsg.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMsg);
        }

        res.status(200).json(newMsg);
    }
    catch(e){
        console.log("Error in sending message",e.message);
        res.status(400).json({msg:'something went wrong'});
    }
})

module.exports=router;