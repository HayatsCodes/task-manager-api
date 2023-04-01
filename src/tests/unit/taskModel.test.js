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

            const task = {
                description: 'A new task',
                owner: user._id
            };

            const savedTask = await taskModel.findOne({ owner: user._id });
            expect(savedTask).haveProper(task);
        });
    })
});

// @Todo:
// saves a new task
// check for required item