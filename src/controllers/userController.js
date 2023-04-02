const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

async function registerUser(req, res) {
    try {
        const { firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.json({ message: 'Please enter all the details' });
        }

        const userExist = await userModel.findOne({ email: req.body.email });

        if (userExist) {
            return res.json({ message: 'User already exist with the given email'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const user = new userModel(req.body);
        await user.save();

        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE
        });c
        return res.status(201).cookie({'token': token}).json({success: true, message: 'User registered successfully', data: user})
    } catch (error) {
        return res.json({ error: error });
    }
}

// helper function
async function verifyUser(userEmail, userPassword) {
    const userExist = userModel.findOne({ email: userEmail});
    const isPasswordMatched = await bcrypt.compare(userPassword, userExist.password)

    if (!userExist && !isPasswordMatched) {
        return res.json({message: 'Incorrect email or password'});
    }
    return userExist._id;
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({message: 'Please enter your email and password'});
        }
    
        const userId = verifyUser(email, password);
    
        const token = await jwt.sign({id: userId}, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    
        return res.cookie({'token': token}).json({success:true,message:'LoggedIn Successfully'});
        
    } catch (error) {
        return res.json({ error });
    };
   
}

module.exports = {
    registerUser,
    loginUser,
}