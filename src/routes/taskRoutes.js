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

taskRouter.use(authMiddleware);
taskRouter.post('/tasks', addTask);
taskRouter.get('/tasks', getTasks);
taskRouter.get('/tasks/:id', getTask);
taskRouter.patch('/tasks/:id', updateTask);
taskRouter.delete('/tasks/:id', deleteTask);

module.exports = taskRouter;