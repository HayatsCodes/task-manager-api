const mongoose = require('mongoose');
const userModel = require('../../models/userModel');
const { MongoMemoryServer } = require('mongod-memory-server');
const mongod = new MongoMemoryServer();

// @Todo:
// Save a new user
// check for incorrect details : name, email, password
// check for required field

describe('Save user', () => {
    beforeAll(async () => {
        const uri = await mongod.getUri()
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });


    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });

    test('Should save a new user to the database', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        };
        const newUser = new userModel(userData);
        await newUser.save();

        const savedUser = await userModel.findOne({email: 'johndoe@example.com'})
        expect(savedUser).toMatchObject(userData);
    });
});