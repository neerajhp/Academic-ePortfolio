const server = require('../../server') // Link to your server file
const supertest = require('supertest')

const request = supertest(server)


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
    .expect(200)

})
