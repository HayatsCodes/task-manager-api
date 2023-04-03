const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');

describe('User endpoints', () => {


    describe('POST auth/register', () => {

        it('Should register a user succesfully', () => {
    
        });
    });
})


// @Todo:
//  1. Test the auth/register endpoint:
//      a. Should register a user succesfully
//  2. Test the auth/login endpoint:
//      b. should login a registered user succesfully
//      c. sould reject an unregistered user 
