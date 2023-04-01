const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connection.once('open', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

