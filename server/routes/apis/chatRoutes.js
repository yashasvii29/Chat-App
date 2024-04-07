const express = require('express');
const router = express();
const User = require('../../models/User');
const Chat = require('../../models/Chat');


// to access the chats
router.post('/',async(req,res)=>{
    let userId = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.status(400).json({msg:'something went wrong'});
      }

      let chat = await Chat.find({
        isGroupChat : false,
        $ans: [
            {users: {$elemMatch :{ $eq: req.user._id}}},
            { users: { $elemMatch: {$eq: userId}}},
        ]
      })
      .populate(['users','-password']).populate("latestMsg");

      chat = await User.populate(chat,{
        path: "latestMessage.sender",
        select: "name pic email"
      });

      if(chat.length>0){
        res.send(chat[0]);
      }
      else{
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
          };
      }
      try{
        //create a new private chat between sender and receiver
        let created_chat=await Chat.create(chatData);
        //add this chat to both sender and receiver
        const FullChat = await Chat.findOne({_id:created_chat._id}).populate(
            "users",
            "-password"
        );
        return res.status(200).json(FullChat);
      }
      catch(e){
        return res.status(400).json({msg:'something went wrong'});
      }

})

// to fetch the chats
router.get('/', async(req,res)=>{

    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
          .populate("users", "-password")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 })
          .then(async (results) => {
            results = await User.populate(results, {
              path: "latestMessage.sender",
              select: "name pic email",
            });
            res.status(200).send(results);
          });
      } 
      catch (e) {
        return res.status(400).json({msg:'something went wrong'});
       
      }
});

// to create new  GroupChat
router.post('/createGroupChat', async (req, res) => {
    try {
      // Extract the user IDs and chat name from the request body
      const { userIds, chatName } = req.body;
  
      // Check if the user IDs and chat name are provided
      if (!userIds ||!chatName) {
        return res.status(400).json({ msg: 'Please provide user IDs and chat name' });
      }
  
      // Create a new chat document
      const newChat = new Chat({
        chatName,
        isGroupChat: true,
        users: userIds,
      });
  
      // Save the new chat document to the database
      const savedChat = await newChat.save();
  
      // Add the new chat to each user's chats array
      const userPromises = userIds.map((userId) => User.findByIdAndUpdate(userId, { $push: { chats: savedChat._id } }));
      await Promise.all(userPromises);
  
      // Populate the users field in the new chat document
      const populatedChat = await Chat.findById(savedChat._id)
       .populate('users', '-password')
       .populate('latestMsg');
  
      res.json(populatedChat);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });

// to fetch Groups
router.get('/fetchGroup',async(req,res)=>{
    try {
        const groups = await Chat.find({ isGroupChat: true })
         .populate('users', '-password')
         .populate('latestMsg');
    
        res.json(groups);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
      }
});


// Fetch group chat data
router.get('/fetchGroup/:groupId', async (req, res) => {
    try {
      const chat = await Chat.findOne({
        _id: req.params.groupId,
        isGroupChat: true,
      })
      .populate('users', '-password')
      .populate('latestMsg');
  
      if (!chat) {
        return res.status(404).json({ msg: 'Group not found' });
      }
  
      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });
// to rename the group
  router.put('/rename',async(req,res)=>{
      const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).json({msg:'chat not found'});
    
    } 
    else {
      return res.status(200).json(updatedChat);
    }
  });

// to remove the user from group only admin can remove
  router.put('/remove',async(req,res)=>{
    const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(400).json({msg:'chat not found'});
  
  }
  else {
      return res.status(200).json({msg:'user has been removed from group'});
  }
  });

// exit from the group

router.put('/exitGroup', async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    // Check if the user is a member of the group chat
    const chat = await Chat.findById(chatId);
    if (!chat.users.includes(userId)) {
      return res.status(400).json({ msg: 'User is not a member of the group chat' });
    }

    // Remove the user from the group chat
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
     .populate('users', '-password')
     .populate('groupAdmin', '-password');

    // Remove the group chat from the user's chats array
    await User.findByIdAndUpdate(userId, { $pull: { chats: chatId } });

   return res.status(200).json(updatedChat);
  }
   catch (err) {
    console.error(err.message);
    return  res.status(400).json({ msg: 'Server error' });
  }
});


// add to group means to add someone to the group
router.put('/addToGroup', async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    // Check if the user is already a member of the group chat
    const chat = await Chat.findById(chatId);
    if (chat.users.includes(userId)) {
      return res.status(403).json({ msg: 'User is already a member of the group chat' });
    }

    // Add the user to the group chat
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

    // Add the group chat to the user's chats array
    await User.findByIdAndUpdate(userId, { $push: { chats: chatId } });

    return res.status(200).json(updatedChat);
  } 
  catch (err) {
      console.error(err.message);
      res.status(400).json({ msg: 'Something went wrong' });
  }
});

module.exports=router;