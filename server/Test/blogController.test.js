const server = require('../../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(server);

const { clearDB } = require('./clearDB');
const { setupUser, loginUser, idUser, getuserName } = require('./login');

clearDB();
setupUser();

let token;
let ID;
let userName;
beforeAll(async () => {
    token = await loginUser();
    ID = await idUser();
    userName = await getuserName();
})

// Should return an empty list when getting blogs
test("Should get nothing when attempting to get the experience", async () =>{
    await request.get("/api/blog")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual([]);
    });
    
});
// Should create a blog object
let objectID
test("Should create a blog object", async () =>{
    await request.post("/api/blog")
    .set('Authorization', 'bearer ' + token)
    .send({
        title: "My Blog",
        content: "Blah blah blah",
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "title": "My Blog",
            "content": "Blah blah blah",
        }))
        objectID = data.body._id
    })
    
});