const mongoose = require("mongoose");
const Document = require("../Models/Document");

const blogSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    title: {type: String, required: true},
    dateCreated: {type: Date, required: true},
    content: {type: String, default: ""},
    images: {type: [Document]}
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;

