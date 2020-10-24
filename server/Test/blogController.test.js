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
// Should add image id to the blog
test("Should add image id to the blog", async () => {
    await request.put(`/api/blog/images/${objectID}`)
    .set('Authorization', 'bearer ' + token)
    .send({
        images: ["5f6ghtyksoi"]
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "images": ["5f6ghtyksoi"]
        }));
    });
});

// Should delete the image
test("Should delete the image", async () => {
    await request.delete(`/api/blog/images/${objectID}`)
    .set('Authorization', 'bearer ' + token)
    .send({
        images: ["5f6ghtyksoi"]
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
    });
});

// Should create another blog
test("Should create another blog object", async () =>{
    await request.post("/api/blog")
    .set('Authorization', 'bearer ' + token)
    .send({
        title: "My Blog 2",
        content: "Gorgonzola",
    })
    .expect(200)
    .then(data => {
        expect(data).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "title": "My Blog 2",
            "content": "Gorgonzola",
        }));
    })
    
});

// Should create another blog 2
test("Should create another blog object 2", async () =>{
    await request.post("/api/blog")
    .set('Authorization', 'bearer ' + token)
    .send({
        title: "My Blog 3",
        content: "Tortilla",
    })
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "title": "My Blog 3",
            "content": "Tortilla",
        }));
    })
    
});

// Should get every blog
test("Should get every blog", async () => {
    await request.get("/api/blog")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
    });
});

// Should get specific blog
test("Should get specific blog", async () => {
    await request.get(`/api/blog/${objectID}`)
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "title": "My Blog",
            "content": "Blah blah blah"
        }))
    });
});

// Should get viewed user's blogs
test("Should get viewed user's blogs", async () => {
    await request.get("/view/blog/test")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
    })
})

// Should update specified blog
test("Should update specified blog", async () => {
    await request.put(`/api/blog/${objectID}`)
    .set('Authorization', 'bearer ' + token)
    .send({
        "content": "Parmesan cheese"
    })
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
        expect(data.body).toEqual(expect.objectContaining({
            "title": "My Blog",
            "content": "Parmesan cheese"
        }))
    });

});


// Should delete specified blog
test("Should delete the specified blog object", async () => {
    await request.delete(`/api/blog/${objectID}`)
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
    });
});

// Should fail to delete a blog that does not exist
test("Should fail to delete a blog that does not exist", async () => {
    await request.delete(`/api/blog/${objectID}`)
    .set('Authorization', 'bearer ' + token)
    .expect(400)
    .then(data => {
        expect(data.body).toBeDefined()
    });
});

// Should delete every blog
test("Should delete every blog", async () => {
    await request.delete("/api/blog/")
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined()
        expect(data.body).toEqual("2 entries have been deleted")
    });
});

