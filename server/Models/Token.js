const mongoose = require("mongoose");

// Token Schema
const tokenSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 43200 
    }
});

// Binds the userSchema to a user model
const Token = mongoose.model("Token", tokenSchema);

module.exports  = Token;
