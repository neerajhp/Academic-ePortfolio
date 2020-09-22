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
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    }
});

// Binds the userSchema to a user model
const User = mongoose.model("User", userSchema);

module.exports  = User;
