const taskModel = require('../models/taskModel');

async function addTask(req, res) {
    try {
        const task = new taskModel({
            ...req.body,
            owner: req.user._id
        });
        await task.save();

        res.status(201).json({ 'task': task} );
    } catch (error) {
        return res.json({ error });
    }
}

async function getTasks() {
    try {
        const tasks = 
    } catch (error) {
        return res.json({ error });
    }
}