const express = require('express');

const taskRouter = express.Router();

taskRouter.get('/tasks', getAll)