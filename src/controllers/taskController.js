const taskModel = require('../models/taskModel');

async function addTask(req, res) {
    try {
        const task = new taskModel({
            
        })
    } catch (error) {
        return res.json({ error });
    }
}