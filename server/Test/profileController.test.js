const server = require('../../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(server)
const mongoose = require('mongoose');

const { setupDB } = require('./setup');
const { response } = require('../../app');
// const loginUser = require('./loginAuth');
setupDB();

let token;

beforeAll(async () =>{
    await request.post("/api/user/signup")
    .send({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        password: "test123"
    })
    .expect(201)

    await request.post("/api/user/login")
    .send({
        email: "test@gmail.com",
        password: "test123"
    })
    .expect(200)
    .then((response) => {
        expect(response.body.token).toBeTruthy()
        token = response.body.token
    })

})

test("Should return a token", () =>{
    console.log(token)
    expect(token).toBeTruthy();
})