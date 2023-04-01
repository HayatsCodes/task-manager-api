const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:[4,'First name should be minimum of 3 characters']
    },
    lastName: {
        type: String,
        required: true,
        minLength:[4,'Last name should be minimum of 3 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8,'Password should be minimum of 8 characters']
    },

})