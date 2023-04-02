const express = require('express');
const { adminGetUser, registerUser, loginUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/admin/users', adminGetUser);
userRouter.post('/auth/register', registerUser);
userRouter.post('/auth/login', loginUser);

module.exports = userRouter;