const mongoose = require("mongoose");
const Document = require("../Models/Document");

const blogSchema = mongoose.Schema({
    user_id: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now},
    content: {type: String, default: ""},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: "Document"}]
});

const dateFormatter = (dateStr) => {
    var date = new Date(dateStr);
    console.log(date);
}

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;

