const express = require('express');
const router = express.Router();
const Users = require('../../models/User');
const Chats = require('../../models/Chat');

router.post('/chat', async (req, res) => {
  try {
      const { senderId, receiverId } = req.body;
      const newChat = new Chats({ members: [senderId, receiverId] });
      await newChat.save();
      res.status(200).send('chat created successfully');
  } catch (error) {
      console.log(error, 'Error')
  }
})

router.get('/chat/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const chat = await chat.find({ members: { $in: [userId] } });
      const chatUserData = Promise.all(chat.map(async (chat) => {
          const receiverId = chat.members.find((member) => member !== userId);
          const user = await Users.findById(receiverId);
          return { user: { receiverId: user._id, email: user.email, username: user.username }, chatId: chat._id }
      }))
      res.status(200).json(await chatUserData);
  } catch (error) {
      console.log(error, 'Error')
  }
})
module.exports = router;