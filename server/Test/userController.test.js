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
    .set('Cookie', 'token='+ token)
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
    .set('Cookie', 'token='+ token)
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

let userName
test("Should change the username", async () => {
    await request.put("/api/user/update/username")
    .set('Cookie', 'token='+ token)
    .send({
        userName: "testing"
    })
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body).toEqual("testing")
        userName = response.body
    })
})

// this function should return the result of the change, make the edit.

test("Should edit the user's information", async () => {
    await request.put("/api/user/userInfo")
    .set('Cookie', 'token='+ token)
    .send({
        firstName: "test2"
    })
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body).toEqual("Successfully updated user information")
    })
})


test("Should return information on the user for the viewer", async () => {
    await request.get(`/api/view/userInfo/${userName}`)
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body.userName).toEqual(userName)
        expect(response.body.firstName).toEqual("test2")
        expect(response.body.lastName).toEqual("test")
        expect(response.body.email).toEqual("test@gmail.com")
        expect(response.body.mobileNumber).toEqual("0123456789")
        expect(response.body.birthDate).toEqual(expect.objectContaining(new Date("2000/01/01")))
    })
})

test("Should not return information on the user that doesn't exist for the viewer", async () => {
    await request.get(`/api/view/userInfo/test`)
    .expect(404)
    .then((response) => {
        expect(response.body).toBeDefined
    })
})

let userID
test("Should get the userID", async () => {
    await request.get(`/api/user/getID`)
    .set('Cookie', 'token='+ token)
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        userID = response.body
    })
})

test("Should update email of a logged in user", async () => {
    await request.put("/api/user/update/email")
    .set('Cookie', 'token='+ token)
    .send({
        email: 'test2@gmail.com'
    })
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body).toEqual('Email updated')
    })
})

test("Should return updated email", async () => {
    await request.get("/api/user/userInfo")
    .set('Cookie', 'token='+ token)
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body.email).toEqual("test2@gmail.com")
    })
})

test("Should update the password of a logged in user with the old password", async () => {
    await request.put("/api/user/update/password")
    .set('Cookie', 'token='+ token)
    .send({
        oldPassword: 'test123',
        newPassword: 'test1234'
    })
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body).toEqual('Password updated')
    })
})

test("Should not update the password when the wrong old password is given", async () => {
    await request.put("/api/user/update/password")
    .set('Cookie', 'token='+ token)
    .send({
        oldPassword: 'test123',
        newPassword: 'test1234'
    })
    .expect(400)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body).toEqual('User inputted the wrong password')
    })
})

test("Should get the tutorial boolean", async () => {
    await request.get("/api/user/tutorial")
    .set('Cookie', 'token='+ token)
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body).toEqual(true)
    })
})

test("Should change the tutorial boolean", async () => {
    await request.put("/api/user/update/tutorial")
    .set('Cookie', 'token='+ token)
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body).toEqual(false)
    })
})

test("Should return search result for user when searching for first name", async () => {
    await request.get("/api/user/search")
    .query({
        name: "test2"
    })
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body[0].userName).toEqual(userName)
        expect(response.body[0]._id).toEqual(userID)
    })
})

test("Should return search result for user when searching for last name", async () => {
    await request.get("/api/user/search")
    .query({
        name: " test"
    })
    .expect(200)
    .then((response) => {
        expect(response.body).toBeDefined
        expect(response.body[0].userName).toEqual(userName)
        expect(response.body[0]._id).toEqual(userID)
    })
})