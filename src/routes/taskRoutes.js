const express = require('express');

const taskRouter = express.Router();

taskRouter.post('/tasks')
taskRouter.get('/tasks', getTasks);
taskRouter.get('/tasks/:id', getTask);
