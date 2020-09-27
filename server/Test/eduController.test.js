const server = require('../../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose');

const { clearDB } = require('./setup');
const loginUser = require('./login');

clearDB();

let token;
beforeAll(async () => {
    token = await loginUser();
})

test("Should return error because there are no education histories ", async () =>{
    await request.get("/api/profile/education")
    .set('Authorization', 'bearer ' + token)
    .expect(404)
    .then(data => {
        expect(data.body.error).toEqual("education history not found")
    })
})

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
        expect(data).toBeDefined()
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
    })
    
})

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

test("Should get all education ", async () =>{
    await request.get("/api/profile/education")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
    })
})

    