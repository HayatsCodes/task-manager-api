const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
    addTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask,
} = require('../controllers/taskController')

const taskRouter = express.Router();

taskRouter.post('/tasks', authMiddleware, addTask);
taskRouter.get('/tasks', authMiddleware, getTasks);
taskRouter.get('/tasks/:id', authMiddleware, getTask);
taskRouter.patch('/tasks/:id', authMiddleware, updateTask);
taskRouter.delete('/tasks/:id', authMiddleware, deleteTask);
