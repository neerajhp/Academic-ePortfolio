const server = require('../../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(server)
const mongoose = require('mongoose');

const { clearDB } = require('./clearDB');


clearDB();

test("Should sign up a user", async () =>{
    await request.post("/api/user/signup")
    .send({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        userName: "testing123",
        password: "test123",
        isVerified: true
    })
    .expect(200)
    

})

test("Should not sign up a user with the same email", async () =>{
    await request.post("/api/user/signup")
    .send({
        firstName: "test2",
        lastName: "test2",
        email: "test@gmail.com",
        password: "test2"
    })
    .expect(400)
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

let token
test("Should return JWT Token", async () =>{
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

test("Should edit information on the user", async () => {
    await request.put("/api/user/userInfo")
    .set('Authorization', 'bearer ' + token)
    .send({
        mobileNumber: "0123456789",
        birthDate: new Date("2000/01/01")
    })
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
    })
})

test("Should return information on the user", async () => {
    await request.get("/api/user/userInfo")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body.userName).toEqual("test")
        expect(response.body.firstName).toEqual("test")
        expect(response.body.lastName).toEqual("test")
        expect(response.body.email).toEqual("test@gmail.com")
        expect(response.body.mobileNumber).toEqual("0123456789")
        expect(response.body.birthDate).toEqual(expect.objectContaining(new Date("2000/01/01")))
    })
})

test("Should change the username", async () => {
    await request.put("/api/user/update/username")
    .set('Authorization', 'bearer ' + token)
    .send({
        userName: "testing"
    })
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body).toEqual("testing")
    })
})