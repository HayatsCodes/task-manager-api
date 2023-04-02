const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

const userRouter = require('./routes/userRoutes');

app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());
app.use('/', userRouter);

module.exports = app;