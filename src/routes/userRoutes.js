const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/auth/register', registerUser);
userRouter.post('/auth/login', loginUser);

module.exports = userRouter;