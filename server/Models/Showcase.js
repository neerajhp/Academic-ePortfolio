const mongoose = require("mongoose");
const featuredWorkSchema = require("../Models/FeaturedWork").featuredWorkSchema;

// This represents a user's entire showcase
// It is meant to store the featured works
const showcaseSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  featuredWorks: [featuredWorkSchema],
});

const Showcase = mongoose.model("Showcase", showcaseSchema);
module.exports = Showcase;
