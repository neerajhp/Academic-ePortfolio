const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  content: { type: String, default: "" },
  images: [{ type: String }],
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
