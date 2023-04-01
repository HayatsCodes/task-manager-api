const mongoose = require('mongoose');
const { validate } = require('./taskModel');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:[2,'First name should be minimum of 2 characters']
    },
    lastName: {
        type: String,
        required: true,
        minLength:[2,'Last name should be minimum of 2 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: []
    },
    password: {
        type: String,
        required: true,
        minLength: [8,'Password should be minimum of 8 characters']
    },

    token: {
        type: String,
    }

});

module.exports = mongoose.model('User', userSchema);