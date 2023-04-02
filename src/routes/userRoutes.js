const express = require('express');
require('../')

const userRouter = express.Router();

userRouter.get('/admin/user', adminGetUser);
userRouter.post('/auth/register', registerUser);
userRouter.post('/auth/login', loginUser);