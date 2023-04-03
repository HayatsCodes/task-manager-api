const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');

const app = express();


app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());
app.use('/', userRouter);
app.use('/', taskRouter);
module.exports = app;