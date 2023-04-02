const express = require('express');
const authMiddleware = require('../')
const taskRouter = express.Router();

taskRouter.post('/tasks', addTask);
taskRouter.get('/tasks', getTasks);
taskRouter.get('/tasks/:id', getTask);
taskRouter.patch('/tasks/:id', updateTask);
taskRouter.delete('/tasks/:id', deleteTask);
