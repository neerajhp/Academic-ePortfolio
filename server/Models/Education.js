const mongoose = require("mongoose");

//Education history must support multiple entries of universities or highschool, start and end date 
// not overlapping, end date not more than current date available create dropdown menu to and 
// javascript to check for this in the front end, backend will not check for figures(may cause crash 
// if not validated properly)
// Education history, a combination for university and highschool,

// Education History Schema
const eduSchema = mongoose.Schema({
    edu_type: {
        type: String,
        enum: ["University", "Highschool"],
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    highName: {
        type: String
    },
    uniName: {
        type: String
    },
    unicourseName: {
        type: String
    },
    unimajorName: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    monthStart: {
        type: Number,
        required: true
    },
    yearStart: {
        type: Number,
        required: true
    },
    monthEnd: {
        type: Number,
        required: true
    },
    yearEnd: {
        type: Number,
        required: true
    },
    graduated: {
        type: Boolean,
        default: true
    }
});

const Edu = mongoose.model("Edu", eduSchema);

module.exports = Edu;
