const express = require('express');
const app = express();
const morgan = require('morgan');



app.use(morgan('combined'));
app.use(express.json());

module.exports = app;