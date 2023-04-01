const mongoose = require('mongoose');
const userModel = require('../../models/userModel');
const Mockgoose = require('mockgoose').Mockgoose;

const mockgoose = new Mockgoose(mongoose);

// @Todo:
// Save a new user
// check for incorrect details : name, email, password
// check for required field

describe('Save user', () => {
    beforeAll(async () => {
        await mockgoose.prepareStorage();
        await mongoose.connect('mongodb://localhost/TestingDB', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    });

    afterEach(async () => {
        await mockgoose.helper.reset();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('Should save a new user', async () => {
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
    }, 10000);
});