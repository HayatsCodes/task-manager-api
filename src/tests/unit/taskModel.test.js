const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const taskModel = require('../../models/taskModel');
const userModel = require('../../models/userModel');


describe('Task Model', () => {
    let mongo;

    beforeAll( async () => {
        mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll( async () => {
        await mongoose.disconnect();
        await mongo.stop();
    });

    describe('Save task', () => {
        test('Should save a new task to the database', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            };

            const user = await userModel.create(userData);

            const taskData = {
                description: 'A new task',
                owner: user._id
            };

            await taskModel.create(taskData);

            const savedTask = await taskModel.findOne({ owner: user._id });
            expect(savedTask).toHaveProperty('description', 'owner', 'completed');
        });
 
        test('Should save a completed task', async () => {
            const userData = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'janedoe@example.com',
                password: 'password123',
            };
            const user = await userModel.create(userData);

            const taskData = {
                description: 'A Completed task',
                owner: user._id,
                completed: true
            };

            await taskModel.create(taskData);

            const savedTask = await taskModel.findOne({ owner: user._id });
            expect(savedTask).toHaveProperty('description', 'owner', 'completed');
        });
    });

    describe('reject task with missing required fields', () => {
        test('should reject task with no description field', async () => {
            const userData = {
                firstName: 'Jack',
                lastName: 'Dee',
                email: 'jackdee@example.com',
                password: 'password123',
            };
            const user = await userModel.create(userData);

            const taskData = {
                owner: user._id,
                completed: true
            };

            await expect(taskModel.create(taskData)).rejects.toThrow();
        });

        test('should reject task with no owner field', async () => {
            const userData = {
                firstName: 'Alisa',
                lastName: 'Kim',
                email: 'alisakim@example.com',
                password: 'password123',
            };
            const user = await userModel.create(userData);

            const taskData = {
                description: 'An unknown owner',
                completed: true
            };

            await expect(taskModel.create(taskData)).rejects.toThrow();
        });
    });
});

// @Todo:
// saves a new task
// check for required item