const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const taskModel = require('../../models/taskModel');

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
            const 
        });
    })
});

// @Todo:
// saves a new task
// check for required item