const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

async function registerUser(req, res) {
    try {
        const { firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'Please enter all the details' });
        }

        const userExist = await userModel.findOne({ email: req.body.email });

        if (userExist) {
            return res.status(400).json({ error: 'User already exist with the given email'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const user = new userModel(req.body);

        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE
        });

        user.token = token;
        await user.save();

        return res
        .status(201)
        .cookie('token', token, { httpOnly: true })
        .json({ success: true, message: 'User registered successfully', data: user });
    } catch (error) {
        console.log('Error occurred at line: ', error.stack);
        return res.status(400).json({ error });

    }
}

// helper function
async function verifyUser(userEmail, userPassword) {
    const errorMessage = 'Incorrect email or password'
    const userExist = await userModel.findOne({ email: userEmail});
    if (!userExist) {
        return errorMessage;
    }

    const isPasswordMatched = await bcrypt.compare(userPassword, userExist.password)

    if (!isPasswordMatched) {
        return errorMessage;
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({error: 'Please enter your email and password'});
        }

        console.log('password: ', password);
    
        const errorMessage = await verifyUser(email, password);
        if (errorMessage) {
            return res.status(400).json({error: errorMessage});
        }

        const user = await userModel.findOne({ email: email })
        const userId = user._id;

    
        const token = await jwt.sign({id: userId}, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        user.token = token;
        await user.save();

        return res
        .status(201)
        .cookie('token', token, { httpOnly: true })
        .json({success:true,message:'LoggedIn Successfully'});

        
    } catch (error) {
        console.log('Error occurred at line: ', error.stack);
        return res.status(400).json({ error });
    };
   
}

module.exports = {
    registerUser,
    loginUser,
}