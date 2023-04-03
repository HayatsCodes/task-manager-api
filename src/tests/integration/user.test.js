const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
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
    })

    describe('POST auth/register', () => {
        it('Should register a user succesfully', async () => {
            const res = await request(app)
            
        });
    });
})


// @Todo:
//  1. Test the auth/register endpoint:
//      a. Should register a user succesfully
//  2. Test the auth/login endpoint:
//      b. should login a registered user succesfully
//      c. sould reject an unregistered user 
