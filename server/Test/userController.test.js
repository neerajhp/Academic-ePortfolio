const server = require('../../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(server)
const {removeAllCollections, dropAllCollections} = require("./database")

// Clear Database
afterAll(async () => {
    await removeAllCollections()
})

// Disconnect Mongoose
afterAll(async () => {
await dropAllCollections()
})


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

