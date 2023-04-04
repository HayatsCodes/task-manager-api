const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();
const app = require('../../app');

describe('Task endpoints', () => {
    let mongo;
    let owner;
    let cookie;
    let fakeCookie;

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

        owner = response.body.data._id;
        cookie = response.headers['set-cookie'][0];
        demoCookie = [{
            cookie:  'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmMyMjI2OGVjNjExYTU1NzllYzlmNiIsImlhdCI6MTY4MDYxMzkyNiwiZXhwIjoxNjgxMDQ1OTI2fQ.5txlo3GfqwPgfi2GxH6VON4ciHW-vJSX6848gSokFOE; Path=/; HttpOnly'
        }];
        fakeCookie = demoCookie[0].cookie;
    });

    afterAll(async () => {
        mongoose.disconnect();
        mongo.stop();
    });

    describe('POST /tasks', () => {
        it('Should add a task succesfully for logged in user', async () => {
            const task  = {
                description: 'First task',
            }
            const res = await request(app)
            .post('/tasks')
            .send(task)
            .set('Cookie', cookie)
            .expect('Content-Type', /json/)
            .expect(201);
            expect(res.body.task.description).toBe(task.description);
            expect(res.body.task.completed).toBe(false);
            expect(res.body.task.owner).toBe(owner);

        });

        it('Should not add a task for users with invalid token', async () => {
            const task  = {
                description: 'Task 1',
            }
            const res = await request(app)
            .post('/tasks')
            .send(task)
            .set('Cookie', fakeCookie)
            .expect('Content-Type', /json/)
            .expect(400);
            expect(res.body.message).toBe('Authentication failed');
        });

        it('should not add a task for users that are not logged in', async () => {
            const task  = {
                description: 'Task one',
            }
            const res = await request(app)
            .post('/tasks')
            .send(task)
            .expect('Content-Type', /json/)
            .expect(400);
            expect(res.body.message).toBe('Authentication failed');
        });
    });

    describe('GET /tasks', async () => {
        it('Should return a list of tasks for a logged in user')
        const res = await request(app)
        .get('/tasks')
        .set('Cookie', cookie)
        .expect('Content-Type', /json/)
        .expect(200);

        expect(res.body).toHaveProperty('tasks');
        expect(Array.isArray(res.body.tasks)).toBe(true);
    })

});

// @Todo:
//  1. Test POST /tasks 
//      a. should add a task succesfully for logged in user
//      b. should not add a task for users with invalid token or not logged in
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