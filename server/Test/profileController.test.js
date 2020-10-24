const server = require('../../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose');

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




// Update bio
test("Should update bio", async () =>{
    await request.put("/api/profile/bio")
    .set('Authorization', 'bearer ' + token)
    .send({
        biography: "Testing the functionality of the biography 1 2 3"
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual("Testing the functionality of the biography 1 2 3")
    })
    
});

// Get bio
test("Should get bio", async () => {
    await request.get("/api/profile/bio")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual("Testing the functionality of the biography 1 2 3")
    })
});

// Add skills
test("Should add skills", async () => {
    console.log(token)
    await request.put("/api/profile/skills")
    .set('Authorization', 'bearer ' + token)
    .send({
        skills: ["Basketball", "Table tennis", "Volleyball"]
    })
    .expect(200)
    .then(data => {
        console.log(data.body);
        expect(data).toBeDefined()
        expect(data.body).toEqual(
            ["Basketball", "Table tennis", "Volleyball"])
    })
});

// Attempt to add duplicate skill
test("Should only allow one instance of the same skill", async () => {
    await request.put("/api/profile/skills")
    .set('Authorization', 'bearer ' + token)
    .send({
        skills: ["Basketball"]
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(["Basketball", "Table tennis", "Volleyball"])
    })
});

// Get skills
test("Should get skills", async () => {
    await request.get("/api/profile/skills")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(["Basketball", "Table tennis", "Volleyball"])
    })
});

// Should return "" when aboutMe hasn't been initialized
test("Should return empty string when aboutMe hasn't been initialized", async () => {
    await request.get("/api/profile/aboutMe")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data.body).toEqual("")
    })
})

// Update about me
test("Should update aboutMe", async () => {
    await request.put("/api/profile/aboutMe")
    .set('Authorization', 'bearer ' + token)
    .send({
        aboutMe: "blah blah blah"
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual("blah blah blah")
    })
    
});

// Get about me
test("Should get aboutMe", async () => {
    await request.get("/api/profile/aboutMe")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual("blah blah blah")
    })
});

// Should create a social media JSON
test('Should update social media JSON', async () => {
    await request.put("/api/profile/social-media")
    .set('Authorization', 'bearer ' + token)
    .send([{"site": "youtube", "link": "www.youtube.com"}, {"site": "facebook", "link": "www.facebook.com"}])
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual({
            linkedIn: "",
            facebook: "www.facebook.com",
            instagram: "",
            youtube: "www.youtube.com",
            twitter: ""
        })
    });
});

// Should remove unwanted social media links
test('Should remove unwanted social media links', async () => {
    await request.put("/api/profile/social-media")
    .set('Authorization', 'bearer ' + token)
    .send([{"site": "youtube", "link": ""}])
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual({
            linkedIn: "",
            facebook: "www.facebook.com",
            instagram: "",
            youtube: "",
            twitter: ""
        })
    });
});

// Should return an error when tryin to access cv, because it hasn't been uploaded
test("Should return error when trying to access cv", async () => {
    await request.get("/api/profile/cv")
    .set('Authorization', 'bearer ' + token)
    .expect(404)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual('CV not found')
    })
});

// Should return an error when trying to access profile picture, because it hasn't been uploaded
test("Should return error when trying to access profile picture", async () => {
    await request.get("/api/profile/profile-pic")
    .set('Authorization', 'bearer ' + token)
    .expect(404)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual('Profile picture not found')
    })
});

// Get user's profile
test("Should be able to find the user's profile", async () => {
    await request.get("/api/profile")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
    });
});

// Should change user's privacy to true
test("Should change user's privacy to true", async () => {
    await request.put("/api/profile/private")
    .set('Authorization', 'bearer ' + token)
    .send({
        private: true
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(true)
    });
});

// Delete the user
test("Should delete the user and all of the info attached to the user", async () => {
    await request.delete("/api/profile/deleteProfile")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual("User deleted")
    })
});



