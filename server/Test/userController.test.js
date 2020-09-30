const server = require('../../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(server)
const mongoose = require('mongoose');

const { clearDB } = require('./setup');


clearDB();

test("Should return signup page", async () =>{
    await request.get("/api/user/signup")
    .expect(200)
    

})

test("Should sign up a user", async () =>{
    await request.post("/api/user/signup")
    .send({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        password: "test123"
    })
    .expect(201)
    

})

test("Should not sign up a user with the same email", async () =>{
    await request.post("/api/user/signup")
    .send({
        firstName: "test2",
        lastName: "test2",
        email: "test@gmail.com",
        password: "test2"
    })
    .expect(409)
})

test("Should login the user", async () =>{
    await request.post("/api/user/login")
    .send({
        email: "test@gmail.com",
        password: "test123"
    })
    .expect(200)

})

test("Should not login user with wrong password", async () =>{
    await request.post("/api/user/login")
    .send({
        email: "test@gmail.com",
        password: "testwrongpassword"
    })
    .expect(409)
})

test("Should not login user that has not signed up", async () =>{
    await request.post("/api/user/login")
    .send({
        email: "nonexisttest@gmail.com",
        password: "nonexisttest"
    })
    .expect(409)
})



test("Should return JWT Token", async () =>{
    await request.post("/api/user/login")
    .send({
        email: "test@gmail.com",
        password: "test123"
    })
    .expect(200)
    .then((response) => {
        expect(response.body.token).toBeTruthy()
    })
})