const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function authMiddleware (req, res, next) {
    try {
        const { token } = req.cookies;

        if(!token)
    } catch (error) {
        return res.json({ error });
    }
}