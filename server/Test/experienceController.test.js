const server = require('../../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(server);

const { clearDB } = require('./clearDB');
const { setupUser, loginUser,idUser } = require('./login');

clearDB();
setupUser();

let token;
let ID;
beforeAll(async () => {
    token = await loginUser();
    ID = await idUser();
})

// Should get nothing when attempting to get the experience
test("Should get nothing when attempting to get the experience", async () =>{
    await request.get("/api/experience")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual({
            "employment": [],
            "volunteering": [],
            "extracurricular": [],
        });
    });
    
});

// Add work experience to database
let objectID
test("Should add work experience to database", async () =>{
    await request.post("/api/experience")
    .set('Authorization', 'bearer ' + token)
    .send({
        type: "employment",
        organization: "Real Madrid",
        role: "Player",
        employeeStatus: "Full Time",
        yearStart: 2011,
        yearEnd: 2013,
        monthStart: 10,
        monthEnd: 12,
        // A short paragraph or 2 abt the user's experience
        description: "Striker who scored 20 goals a season, and won the golden boot in 2012",
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "type": "employment",
            "organization": "Real Madrid",
            "role": "Player",
            "employeeStatus": "Full Time",
            "yearStart": 2011,
            "yearEnd": 2013,
            "monthStart": 10,
            "monthEnd": 12,
            "description": "Striker who scored 20 goals a season, and won the golden boot in 2012"
        }))
        objectID = data.body._id
    })
    
});

// Add volunteering experience to database
test("Should add volunteering experience to database", async () =>{
    await request.post("/api/experience")
    .set('Authorization', 'bearer ' + token)
    .send({
        type: "volunteering",
        organization: "UNICEF",
        role: "Admin",
        employeeStatus: "Casual",
        yearStart: 2015,
        yearEnd: 2016,
        monthStart: 5,
        monthEnd: 5,
        // A short paragraph or 2 abt the user's experience
        description: "yadda yadda yadda",
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "type": "volunteering",
            "organization": "UNICEF",
            "role": "Admin",
            "employeeStatus": "Casual",
            "yearStart": 2015,
            "yearEnd": 2016,
            "monthStart": 5,
            "monthEnd": 5,
            "description": "yadda yadda yadda"
        }))
    })
    
});

// Add extracurricular experience to database
test("Should add extracurricular experience to database", async () =>{
    await request.post("/api/experience")
    .set('Authorization', 'bearer ' + token)
    .send({
        type: "extracurricular",
        organization: "Soccer club",
        role: "Member",
        employeeStatus: "",
        yearStart: 2013,
        yearEnd: 2015,
        monthStart: 6,
        monthEnd: 7,
        // A short paragraph or 2 abt the user's experience
        description: "kekl",
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "type": "extracurricular",
            "organization": "Soccer club",
            "role": "Member",
            "employeeStatus": "",
            "yearStart": 2013,
            "yearEnd": 2015,
            "monthStart": 6,
            "monthEnd": 7,
            "description": "kekl"
        }))
    })
    
});

// Should trigger an error when nothing is in the body
test("Should trigger an error when nothing is in the body", async () =>{
    await request.post("/api/experience")
    .set('Authorization', 'bearer ' + token)
    .send({})
    .expect(400)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual('Error while trying to save new experience');
    })
    
});

// Should update the specified experience object
test("Should update the specified experience object", async () =>{
    await request.put(`/api/experience/${objectID}`)
    .set('Authorization', 'bearer ' + token)
    .send({
        organization: "FC Barcelona",
        role: "Manager"
    })
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "type": "employment",
            "organization": "FC Barcelona",
            "role": "Manager",
            "employeeStatus": "Full Time",
            "yearStart": 2011,
            "yearEnd": 2013,
            "monthStart": 10,
            "monthEnd": 12,
            "description": "Striker who scored 20 goals a season, and won the golden boot in 2012"
        }));
    });
});