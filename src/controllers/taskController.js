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

async function getTasks(req, res) {
    try {
        const tasks = await taskModel.find();
        if (!tasks) {
            return res.json({ message: 'No task found'});
        }
        return res.json({ 'tasks': tasks });
    } catch (error) {
        return res.json({ error });
    }
}

async function getTask(req, res) {
    try {
        const { id } = +req.params
    } catch (error) {
        return res.json({ error });
    }
}