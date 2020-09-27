const server = require('../../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose');

const { clearDB } = require('./setup');
const { loginUser,idUser } = require('./login');
const { ObjectID } = require('mongodb');

clearDB();

let token;
let ID;

beforeAll(async () => {
    token = await loginUser();
    ID = await idUser();
})

// getEdu
test("Should return error because there are no education histories ", async () =>{
    await request.get("/api/profile/education")
    .set('Authorization', 'bearer ' + token)
    .expect(404)
    .then(data => {
        expect(data.body.error).toEqual("education history not found")
    })
})

// viwerGetEdu
test("Should return error because there are no education histories ", async () =>{
    await request.get("/api/view/education")
    .send({userID: ID})
    .expect(404)
    .then(data => {
        expect(data.body).toEqual("User has no education history")
    })
})

// postEdu
let objectID
test("Should create new university education history", async () =>{
    await request.post("/api/profile/education")
    .set('Authorization', 'bearer ' + token)
    .send({
        edu_type: "University",
        schoolName: "East Wood University",
        unicourseName: "Bachelor of Commerce",
        unimajorName: "Accounting",
        monthStart: 2,
        yearStart: 2018,
        monthEnd: 12,
        yearEnd: 2020,
        graduated: false
    })
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "edu_type": "University",
            "schoolName": "East Wood University",
            "unicourseName": "Bachelor of Commerce",
            "unimajorName": "Accounting",
            "monthStart": 2,
            "yearStart": 2018,
            "monthEnd": 12,
            "yearEnd": 2020,
            "graduated": false
        }))
        objectID = data.body._id
    })
    
})

// postEdu
test("Should not create education record with wrong edutype", async () =>{
    await request.post("/api/profile/education")
    .set('Authorization', 'bearer ' + token)
    .send({
        edu_type: "Nonexistent",
        schoolName: "West Wood University",
        unicourseName: "Bachelor of Commerce",
        unimajorName: "Accounting",
        monthStart: 2,
        yearStart: 2018,
        monthEnd: 12,
        yearEnd: 2020,
        graduated: false
    })
    .expect(400)
    .then(data => {
        expect(data.body).toEqual("Education type invalid")
    })
})

// postEdu
test("Should not create education record that already exists ", async () =>{
    await request.post("/api/profile/education")
    .set('Authorization', 'bearer ' + token)
    .send({
        edu_type: "University",
        schoolName: "East Wood University",
        unicourseName: "Bachelor of Commerce",
        unimajorName: "Accounting",
        monthStart: 2,
        yearStart: 2018,
        monthEnd: 12,
        yearEnd: 2020,
        graduated: false
    })
    .expect(400)
    .then(data => {
        expect(data.body).toEqual("Education record already exists")
    })
})

// getEdu
test("Should get all education ", async () =>{
    await request.get("/api/profile/education")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
    })
})

// viewerGetEdu
test("Should get education for viewer", async () =>{
    await request.get("/api/view/education")
    .send({userID: ID})
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
        expect(data.body[0]).toEqual(expect.objectContaining({
            "edu_type": "University",
            "schoolName": "East Wood University",
            "unicourseName": "Bachelor of Commerce",
            "unimajorName": "Accounting",
            "monthStart": 2,
            "yearStart": 2018,
            "monthEnd": 12,
            "yearEnd": 2020,
            "graduated": false
        }))
    })
})

// putEdu
test("Should update education history of the user", async () =>{
    await request.put(`/api/profile/education/${objectID}`)
    .set('Authorization', 'bearer ' + token)
    .send({
        graduated: true
    })
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "edu_type": "University",
            "schoolName": "East Wood University",
            "unicourseName": "Bachelor of Commerce",
            "unimajorName": "Accounting",
            "monthStart": 2,
            "yearStart": 2018,
            "monthEnd": 12,
            "yearEnd": 2020,
            "graduated": true
        }))
    })
})
