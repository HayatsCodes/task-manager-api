const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2,'First name should be minimum of 2 characters']
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
        validate: [validator.isEmail, 'Invalid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: [8,'Password should be minimum of 8 characters'],
        maxLength: [15, 'Password should be maximum of 15 characters'],
    },

    admin: {
        type: Boolean,
        default: false,
    },

    token: {
        type: String,
    }

});

module.exports = mongoose.model('User', userSchema);