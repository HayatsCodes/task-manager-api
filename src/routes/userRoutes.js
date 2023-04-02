const express = require('express');


const userRouter = express.Router();

userRouter.get('/user')
userRouter.post('/auth/register', registerUser);
userRouter.post('/auth/login', loginUser);