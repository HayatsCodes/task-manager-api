const express = require('express');
const morgan = require('morgan');
const 

const app = express();

const userRouter = require('./routes/userRoutes');

app.use(morgan('combined'));
app.use(express.json());
app.use('/', userRouter);

module.exports = app;