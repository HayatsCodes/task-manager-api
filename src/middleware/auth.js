const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function authMiddleware (req, res, next) {
    try {
        const { token } = req.cookies;

        if(!token) {
        return res.json({ message: 'Authentication failed' });
        }

        
    } catch (error) {
        return res.json({ error });
    }
}