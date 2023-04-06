const Redis = require("ioredis");
const taskModel = require('../models/taskModel');

// Owner should be the key to a redis db
// the value should be an object 

// owner: tasks

// when a get request is made
// we check if the owner exists in redis db
// if yes, we get the neccesary data from it
//  else, we get the data from  our db and save it to redis db.

const redisClient = new Redis();



async function addTask(req, res) {
    try {
        const task = new taskModel({
            ...req.body,
            owner: req.user._id
        });
        await task.save();

        res.status(201).json({ 'task': task });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

async function getTasks(req, res) {
    try {
        const owner = req.user._id;
        const cachedTasks = await redisClient.get(owner);

        if (cachedTasks) {
            const savedTasks = JSON.parse(cachedTasks);
            return res.json({ 'tasks': savedTasks });
        }
        const tasks = await taskModel.find({ 'owner': owner });
        if (!tasks) {
            return res.json({ error: 'No task found' });
        }
        redisClient.set(owner, JSON.stringify(tasks));
        return res.json({ 'tasks': tasks });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

async function getTask(req, res) {
    try {
        const id = req.params.id;
        const cachedTask = await redisClient.get(id);
        if (cachedTask) {
            const savedTask = JSON.parse(cachedTask);
            console.log()
            return res.json(savedTask);
        }
        const task = await taskModel.findOne({ _id: id });

        if (!task) {
            return res.json({ error: 'Task not found' });
        }
        redisClient.set(id, JSON.stringify(task));
        return res.json(task);

    } catch (error) {
        console.log('Error occurred at line: ', error.stack);
        return res.status(400).json({ error });
    }
}

async function updateTask(req, res) {
    try {
        const id = req.params.id;
        const task = await taskModel.updateOne({ _id: id }, req.body);

        if (task.modifiedCount === 0) {
            return res.status(400).json({ error: 'Task not found' });
        }

        const cachedTask = await redisClient.get(id);
        if (cachedTask) {
            redisClient.set(id, JSON.stringify(task));
        }

        res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        return res.status(400).json({ error });
    }
}

async function deleteTask(req, res) {
    try {
        const id = req.params.id;
        const task = await taskModel.deleteOne({ _id: id });

        if (task.deletedCount === 0) {
            return res.json({ error: 'Task could not be deleted' });
        }

        const cachedTask = await redisClient.get(id);
        if (cachedTask) {
            await redisClient.del(id);
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports = {
    addTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask,
}