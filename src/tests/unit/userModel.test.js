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

    test('Should not save a user with incorrect details', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'password123',
      };
      await expect(userModel.create(userData)).rejects.toThrow();
    });

    test('Should not save a user with missing required fields', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      };
      await expect(userModel.create(userData)).rejects.toThrow();
    });
  });
});
