const mongoose = require('mongoose');
const userModel = require('../../models/userModel');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('userModel', () => {
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

    describe('Save user', () => {
        test('Should save a new user to the database', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            };
            await userModel.create(userData);

            const savedUser = await userModel.findOne({ email: 'johndoe@example.com' });
            expect(savedUser).toMatchObject(userData);
        });
    });

    describe('Reject incorrect details', () => {
        test('Should reject an incorrect email', async () => {
            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoeexample',
                password: 'password123',
            };
            await expect(userModel.create(userData)).rejects.toThrow();
        });
        test('Should reject First Name or Last Name shorter than 2 characters') {
            const userData = {
                firstName: 'J',
                lastName: 'Doe',
                email: 'johndoe@example.com',
                password: 'password123'
              };
              await expect(userModel.create(userData)).rejects.toThrow();
              
              const userData2 = {
                firstName: 'John',
                lastName: 'D',
                email: 'johndoe@example.com',
                password: 'password123'
              };
              await expect(userModel.create(userData2)).rejects.toThrow();
        };
        test('Should reject passwor less than 8 cha')
    });
});
