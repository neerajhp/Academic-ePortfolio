const server = require('../../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose');

const { clearDB } = require('./setup');
const loginUser = require('./login');


clearDB();

let token;
beforeAll(async () => {
    token = await loginUser();
})




// Update bio
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
    
});

// Add skills
test("Should add skills", async () => {
    await request.put("/api/profile/skills")
    .set('Authorization', 'bearer ' + token)
    .send({
        skills: ["Basketball", "Table tennis", "Volleyball"]
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(
            ["Basketball", "Table tennis", "Volleyball"])
    })
});