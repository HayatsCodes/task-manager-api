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
            return res.json({ error: 'No task found'});
        }
        return res.json({ 'tasks': tasks });
    } catch (error) {
        return res.json({ error });
    }
}

async function getTask(req, res) {
    try {
        const id = Number(req.params.id)

        const task = await taskModel.findOne({ _id: id});

        if(!task) {
            return res.json({ error: 'Task not found'});
        }
        return res.json(task);

    } catch (error) {
        return res.json({ error });
    }
}

async function updateTask(req, res) {
    try {
        const id = Number(req.params.id);
        const task = await taskModel.updateOne({ _id: id}, req.body);

        if(task.modifiedCount == 0) {
            return res.json({ error: 'Task not found'});
        }

        res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        return res.json({ error });
    }
}

async function deleteTask(req, res) {
    try {
        const id = Number(req.params.id);
    } catch (error) {
        return res.json({ error });
    }
}