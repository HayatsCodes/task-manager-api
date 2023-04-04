const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();
const app = require('../../app');

describe('Task endpoints', () => {
    let mongo;

    beforeAll( async () => {
        mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const data = {
            firstName: 'John',
            lastName: 'Doe',
            password: "password123",
            email: "king@example.com"
        }
        const response = await request(app)
            .post('/auth/register')
            .send(data);
    });

    afterAll(async () => {
        mongoose.disconnect();
        mongo.stop();
    });


    describe('POST /tasks', () => {
        it('Should add a test succesfully for logged in user', () => {

        });
    })

});

// @Todo:
//  1. Test POST /tasks 
//      a. should add a task succesfully for logged in user
//      b. should not add a task for users with invalid token
// 2. Test GET /tasks
//      b.  should get all task succesfully for logged in user
//      c. should not get task s for users with invalid token
// 3. Test GET /tasks:id
//      c. should get a task by id for logged in user
//      d. should not get a task for users with invalid token
// 4. Test PATCH /tasks:id
//      e. should update a task by id for logged in user
//      f. should not update a task for users with invalid token
// 5. TEST DELETE /tasks:id
//      g. should delete a task by id for logged in user
//      h. should not delete a task for users with invalid token