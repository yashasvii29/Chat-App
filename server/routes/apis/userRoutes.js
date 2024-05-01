// const express = require('express');
// const router = express.Router();
// const Users = require('../../models/User');
// // const getUsers = require('../../controllers/userController');



// router.get('/users/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const users = await Users.find({ _id: { $ne: userId } });
//         const usersData = Promise.all(users.map(async (user) => {
//             return { user: { email: user.email, username: user.username, receiverId: user._id } }
//         }))
//         res.status(200).json(await usersData);
//     } catch (error) {
//         console.log('Error', error)
//     }
// })

// module.exports = router;


const express = require('express');
const router = express.Router();
const Users = require('../../models/User');
const mongoose = require('mongoose'); // Import Mongoose for ObjectId validation

router.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Validate userId as a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        const users = await Users.find({ _id: { $ne: userId } });
        
        const usersData = Promise.all(users.map(async (user) => {
            return { user: { email: user.email, username: user.username, receiverId: user._id } }
        }))
        
        res.status(200).json(await usersData);
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
