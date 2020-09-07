const mongoose = require("mongoose");

//User Schema
const userSchema = mongoose.Schema({
    // uncomment dummyID for tests 
    // For testing purposes, signup a user with dummy id 1001 (Right now there is one in the db already)
    //dummyID: {type: Number},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    biography: {type: String, default: ""}
});

//Education history must support multiple entries of universities or highschool, start and end date 
// not overlapping, end date not more than current date available create dropdown menu to and 
// javascript to check for this in the front end, backend will not check for figures(may cause crash 
// if not validated properly)

// University Education History Schema
const eduUniSchema = mongoose.Schema({
    // user_id: {type: String, required: true},
    uniName: {type: String, required: true},
    courseName: {type: String, required: true},
    majorName: {type: String, required: true},
    monthStart: {type: Number, required: true},
    yearStart: {type: Number, required: true},
    monthEnd: {type: Number, required: true},
    yearEnd: {type: Number, required: true},
    graduated: {type: Boolean, default: true}
});

//HighSchool Education History Schema
const eduHighSchema = mongoose.Schema({
    // user_id: {type: String, required: true},
    highName: {type: String, required: true},
    monthStart: {type: Number, required: true},
    yearStart: {type: Number, required: true},
    monthEnd: {type: Number, required: true},
    yearEnd: {type: Number, required: true},
    graduated: {type: Boolean, default: true}
});

// Binds the userSchema to a user model
const User = mongoose.model("User", userSchema);
const EduUni = mongoose.model("EduUni", eduUniSchema);
const EduHigh = mongoose.model("EduHigh", eduHighSchema);

//module.exports  = User;

module.exports = {
    User,
    EduUni,
    EduHigh
}