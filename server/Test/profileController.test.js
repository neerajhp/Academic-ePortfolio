const server = require('../../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose');

const { clearDB } = require('./setup');
const {loginUser, idUser} = require('./login');


clearDB();

let token;
let ID;
beforeAll(async () => {
    token = await loginUser();
    ID = await idUser();
})





test("Should update bio", async () =>{
    await request.put("/api/profile/bio")
    .set('Authorization', 'bearer ' + token)
    .send({
        biography: "Testing the functionality of the biography 1 2 3"
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual("Testing the functionality of the biography 1 2 3")
    })
    
})