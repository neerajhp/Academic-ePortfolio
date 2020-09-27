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
        console.log(data.body);
        expect(data).toBeDefined()
        expect(data.body).toEqual(
            ["Basketball", "Table tennis", "Volleyball"])
    })
});

// Attempt to add duplicate skill
test("Should only allow one instance of the same skill", async () => {
    await request.put("/api/profile/skills")
    .set('Authorization', 'bearer ' + token)
    .send({
        skills: ["Basketball"]
    })
    .expect(400)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual("Attempted to add nothing or a duplicate skill to the skills array")
    })
});

// Get skills
test("Should get skills", async () => {
    await request.get("/api/profile/skills")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(["Basketball", "Table tennis", "Volleyball"])
    })
});