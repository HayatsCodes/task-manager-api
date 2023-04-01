const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const taskModel = require('../../models/taskModel');
const userModel = require('../../models/userModel');


describe('Task Model', () => {
    let mongo;
    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
    };

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

            const user = await userModel.create(userData);

            const taskData = {
                description: 'A new task',
                owner: user._id
            };

            await taskModel.create(taskData);

            const savedTask = await taskModel.findOne({ owner: user._id });
            expect(savedTask).toHaveProperty('description', 'owner', 'completed');
        });
    });

    describe('reject task with missing required fields')
});

// @Todo:
// saves a new task
// check for required item