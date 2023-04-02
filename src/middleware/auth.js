const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function authMiddleware (req, res, next) {
    try {
        const { token } = req.cookies;

        if(!token) {
        return res.json({ message: 'Authentication failed' });
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findOne({ _id: decoded.id, 'token': token});

        if(!user) {
            return res.json({ message: 'Authentication failed' });
        }

        req.token = token;
        req.user = user;

        next();
        
    } catch (error) {
        return res.json({ error });
    }
}

module.exports = authMiddleware;