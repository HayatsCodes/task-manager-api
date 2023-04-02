const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userModel = require('../../models/userModel');

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

        test('Should reject First Name or Last Name shorter than 2 characters', async () => {
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
        });

        test('Should reject passwords less than 8 characters', async () => {
            const userData = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'janedoe@example.com',
                password: 'pass123'
              };
              await expect(userModel.create(userData)).rejects.toThrow();

              const userData2 = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@example.com',
                password: 'password12345678'
              };
              await expect(userModel.create(userData2)).rejects.toThrow();
        });

        
    });

    describe('Reject user with missing required fields', () => {
        test('Should not save a user with missing required fields', async () => {

            // email missing
            const userData = {
              firstName: 'John',
              lastName: 'Doe',
              password: 'password123',
            };
            await expect(userModel.create(userData)).rejects.toThrow();

            // password missing
            const userData2 = {
              firstName: 'John',
              lastName: 'Doe',
              email: 'johndoe@example.com',
            };
            await expect(userModel.create(userData2)).rejects.toThrow();

            // last name missing
            const userData3 = {
              firstName: 'John',
              email: 'johndoe@example.com',
              password: 'password123',
            };
            await expect(userModel.create(userData3)).rejects.toThrow();

            // first name missing
            const userData4 = {
              lastName: 'Doe',
              email: 'johndoe@example.com',
              password: 'password123',
            };
            await expect(userModel.create(userData4)).rejects.toThrow();
          });
    })
});
