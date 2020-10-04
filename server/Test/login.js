const server = require('../../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(server)

let token;


const loginUser = async () =>{

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

const idUser = async () =>{
    let ID;
    await request.get("/api/user/getID")
    .set('Authorization', 'bearer ' + token)
    .then((response) =>{
        ID = response.body
    })


    return ID
}

module.exports = {loginUser, idUser}