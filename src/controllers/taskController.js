const taskModel = require('../models/taskModel');

async function addTask(req, res) {
    try {
        const task = new taskModel({
            ...req.body,
            owner: req.user._id
        });
        
    } catch (error) {
        return res.json({ error });
    }
}