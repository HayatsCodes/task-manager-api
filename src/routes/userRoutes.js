const express = require('express');

const app = express();

app.post('/register', registerUser)