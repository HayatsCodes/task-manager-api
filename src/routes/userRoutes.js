const express = require('express');
const { adminGetUser, registerUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/admin/user', adminGetUser);
userRouter.post('/auth/register', registerUser);
userRouter.post('/auth/login', loginUser);