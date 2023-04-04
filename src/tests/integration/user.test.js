const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();
const app = require('../../app');

describe('User endpoints', () => {
    let mongo;

    beforeAll(async () => {
        mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongo.stop();
    });

    describe('POST auth/register', () => {
        it('Should register a user succesfully', async () => {
            const data = {
                firstName: "Jane",
                lastName: "Dee",
                password: "password021",
                email: "queen@example.com"
            }
            const res = await request(app)
                .post('/auth/register')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(201);
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toMatchObject(data);
        });

        it('Should not register user with an existing email', async () => {
            const data = {
                firstName: "Janet",
                lastName: "Dickson",
                password: "password123",
                email: "queen@example.com"
            }
            const res = await request(app)
                .post('/auth/register')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(400);
            expect(res.body.error).toBe('User already exist with the given email');
        });
    });

    describe('POST auth/login', () => {
        it('Should login a registered user succesfully', async () => {
            const data = {
                password: "password021",
                email: "queen@example.com"
            }
            const res = await request(app)
                .post('/auth/login')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('LoggedIn Successfully');
        });
    
        it('Should not login user with incorrect details', async () => {
            const data = {
                password: "password0212",
                email: "queen@example.com"
            }
            const res = await request(app)
                .post('/auth/login')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(400);
            expect(res.body.error).toBe('Incorrect email or password');
        });
    });
    
});




// @Todo:
//  1. Test the auth/register endpoint:
//      a. Should register a user succesfully
//  2. Test the auth/login endpoint:
//      b. should login a registered user succesfully
//      c. sould reject an unregistered user 
