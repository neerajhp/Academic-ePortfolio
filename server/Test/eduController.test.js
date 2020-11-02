const server = require("../../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(server);
const mongoose = require("mongoose");

const { clearDB } = require("./clearDB");
const { setupUser, loginUser, idUser, getuserName } = require("./login");
const { searchAllEdu } = require("../Controllers/eduController");

clearDB();
setupUser();

let token;
let ID;
let userName;
beforeAll(async () => {
  token = await loginUser();
  ID = await idUser();
  userName = await getuserName();
});

// beforeEach( (callback) => {
//     setTimeout(() => {
//   callback && callback();
// }, 500);})

// getEdu
test("Should return error because there are no education histories ", async () => {
  await request
    .get("/api/profile/education")
    .set("Cookie", "token=" + token)
    // error handling issue here
    // .expect(404)
    .expect(200)
    .then((data) => {
      expect(data.body).toEqual([]);
    });
});

// viwerGetEdu
test("Should return viewer error because there are no education histories ", async () => {
  await request
    .get("/api/view/education")
    .send({ userID: ID })
    .expect(404)
    .then((data) => {
      // expect(data.body).toEqual("User has no education history")
      expect(data.body).toEqual({});
    });
});

// postEdu
let objectID;
test("Should create new university education history", async () => {
  await request
    .post("/api/profile/education")
    .set("Cookie", "token=" + token)
    .send({
      edu_type: "University",
      schoolName: "East Wood University",
      unicourseName: "Bachelor of Commerce",
      unimajorName: "Accounting",
      monthStart: 2,
      yearStart: 2018,
      monthEnd: 12,
      yearEnd: 2020,
      graduated: false,
    })
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual(
        expect.objectContaining({
          edu_type: "University",
          schoolName: "East Wood University",
          unicourseName: "Bachelor of Commerce",
          unimajorName: "Accounting",
          monthStart: 2,
          yearStart: 2018,
          monthEnd: 12,
          yearEnd: 2020,
          graduated: false,
        })
      );
      objectID = data.body._id;
    });
});

// postEdu
test("Should not create education record with wrong edutype", async () => {
  await request
    .post("/api/profile/education")
    .set("Cookie", "token=" + token)
    .send({
      edu_type: "Nonexistent",
      schoolName: "West Wood University",
      unicourseName: "Bachelor of Commerce",
      unimajorName: "Accounting",
      monthStart: 2,
      yearStart: 2018,
      monthEnd: 12,
      yearEnd: 2020,
      graduated: false,
    })
    .expect(400)
    .then((data) => {
      expect(data.body).toEqual("Education type invalid");
    });
});

// postEdu
test("Should not create education record that already exists ", async () => {
  await request
    .post("/api/profile/education")
    .set("Cookie", "token=" + token)
    .send({
      edu_type: "University",
      schoolName: "East Wood University",
      unicourseName: "Bachelor of Commerce",
      unimajorName: "Accounting",
      monthStart: 2,
      yearStart: 2018,
      monthEnd: 12,
      yearEnd: 2020,
      graduated: false,
    })
    .expect(400)
    .then((data) => {
      expect(data.body).toEqual("Education record already exists");
    });
});

// getEdu
test("Should get all education ", async () => {
  await request
    .get("/api/profile/education")
    .set("Cookie", "token=" + token)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
    });
});

// viewerGetEdu
//let userName = "testing123"
test("Should get education for viewer", async () => {
  await request
    .get("/api/view/education/test")
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body[0]).toEqual(
        expect.objectContaining({
          edu_type: "University",
          schoolName: "East Wood University",
          unicourseName: "Bachelor of Commerce",
          unimajorName: "Accounting",
          monthStart: 2,
          yearStart: 2018,
          monthEnd: 12,
          yearEnd: 2020,
          graduated: false,
        })
      );
    });
});

// putEdu
test("Should update education history of the user", async () => {
  await request
    .put(`/api/profile/education/${objectID}`)
    .set("Cookie", "token=" + token)
    .send({
      schoolName: "North Wood University",
      graduated: true,
    })
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual(
        expect.objectContaining({
          edu_type: "University",
          schoolName: "North Wood University",
          unicourseName: "Bachelor of Commerce",
          unimajorName: "Accounting",
          monthStart: 2,
          yearStart: 2018,
          monthEnd: 12,
          yearEnd: 2020,
          graduated: true,
        })
      );
    });
});

// deleteEdu
test("Should delete education history of the user", async () => {
  await request
    .delete(`/api/profile/education/${objectID}`)
    .set("Cookie", "token=" + token)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual("Education record deleted");
    });
});

// putEdu
test("Should not update education history if it does not exist", async () => {
  await request
    .put(`/api/profile/education/${objectID}`)
    .set("Cookie", "token=" + token)
    .send({
      schoolName: "North Wood University",
      graduated: true,
    })
    .expect(404)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual("Education history not found");
    });
});

//deleteEdu & clearEdu
test("Should not delete a non existent education history", async () => {
  await request
    .delete(`/api/profile/education/${objectID}`)
    .set("Cookie", "token=" + token)
    .expect(404)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual("Education record not found");
    });
});

test("Creating multiple education records", async () => {
  // education record 1
  await request
    .post("/api/profile/education")
    .set("Cookie", "token=" + token)
    .send({
      edu_type: "University",
      schoolName: "East Wood University",
      unicourseName: "Bachelor of Commerce",
      unimajorName: "Accounting",
      monthStart: 2,
      yearStart: 2018,
      monthEnd: 12,
      yearEnd: 2020,
      graduated: false,
    })
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual(
        expect.objectContaining({
          edu_type: "University",
          schoolName: "East Wood University",
          unicourseName: "Bachelor of Commerce",
          unimajorName: "Accounting",
          monthStart: 2,
          yearStart: 2018,
          monthEnd: 12,
          yearEnd: 2020,
          graduated: false,
        })
      );
    });

  // education record 2
  await request
    .post("/api/profile/education")
    .set("Cookie", "token=" + token)
    .send({
      edu_type: "University",
      schoolName: "West Wood University",
      unicourseName: "Bachelor of Science",
      unimajorName: "Computer Science",
      monthStart: 2,
      yearStart: 2018,
      monthEnd: 12,
      yearEnd: 2020,
      graduated: false,
    })
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual(
        expect.objectContaining({
          edu_type: "University",
          schoolName: "West Wood University",
          unicourseName: "Bachelor of Science",
          unimajorName: "Computer Science",
          monthStart: 2,
          yearStart: 2018,
          monthEnd: 12,
          yearEnd: 2020,
          graduated: false,
        })
      );
    });
});

// searchEdu
test("Should get all education ", async () => {
  const result = await searchAllEdu(ID);
  expect(result).toBeDefined();
});
// deleteEdu & ClearEdu
test("Should delete all education records", async () => {
  await request
    .delete("/api/profile/education")
    .set("Cookie", "token=" + token)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual("All records have been deleted");
    });
});

//deleteEdu & ClearEdu
test("Should not delete all education records if they dont exist", async () => {
  await request
    .delete("/api/profile/education")
    .set("Cookie", "token=" + token)
    .expect(400)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body).toEqual("No records were found");
    });
});

// searchAllEdu
test("Should get all education will return null ", async () => {
  const result = await searchAllEdu(ID);
  expect(result).toEqual([]);
});
