const server = require('../../server') // Link to your server file
const supertest = require('supertest')
const mongoose = require('mongoose')

const request = supertest(server)

// // Connecting to Local Test Database
// const databaseName = "test"
// beforeAll(async () =>{
//     mongoose.disconnect();

//     const url = "mongodb://127.0.0.1/${databaseName}"
//     mongoose.connect(
//         url,
//         {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//           useFindAndModify: false,
//         },
//         function (err) {
//           if (!err) {
//             console.log('Connected to mongoDB.');
//           } else {
//             console.log('Failed to connect to mongoDB!', err);
//           }
//         }
//       );
// })

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
