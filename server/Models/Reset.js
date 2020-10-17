const mongoose = require("mongoose");

// Token Schema
const resetSchema = mongoose.Schema({
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

const Reset = mongoose.model("Reset", resetSchema);

module.exports = Reset
