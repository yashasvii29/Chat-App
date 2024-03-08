const express = require('express');
const router = express.Router();
const getUsers = require('.../controllers/userController.js');


router.get("/" ,  getUsers);

export default router;