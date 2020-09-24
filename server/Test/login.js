const server = require('../../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(server)

const loginUser = async () =>{
    let token;
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
    
    return token
}


module.exports = loginUser