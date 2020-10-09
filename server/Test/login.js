const server = require('../../app') // Link to your server file
const supertest = require('supertest');
const request = supertest(server)

let token;

const signupUser = async () =>{
    await request.post("/api/user/signup")
        .send({
            firstName: "test",
            lastName: "test",
            userName: "testing123",
            email: "test@gmail.com",
            password: "test123"
        })
        .expect(200)

}

const loginUser = async () =>{

    await request.post("/api/user/login")
        .send({
            email: "test@gmail.com",
            password: "test123"
        })
        .expect(200)
        .then((response) => {
            expect(response.body.token).toBeTruthy()
            token = response.body.token
            console.log(token)
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

module.exports = {
    async setupUser () {
        beforeAll(async () => {
        await signupUser()
     })
      
    }, loginUser, idUser
}
