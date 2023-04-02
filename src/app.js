const express = require('express');
const app = express();
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');

app.use(morgan('combined'));
app.use(express.json());
app.use('/user', )

module.exports = app;