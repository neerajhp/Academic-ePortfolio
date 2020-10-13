const mongoose = require("mongoose");

//User Schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        //required: true
    },
    mobileNumber: {
        type: String,
    },
    biography: {
        type: String,
        default: ""
    },
    aboutMe: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    },
    tutorial: {
        type: Boolean,
        default: true 
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

// Binds the userSchema to a user model
const User = mongoose.model("User", userSchema);

module.exports  = User;
