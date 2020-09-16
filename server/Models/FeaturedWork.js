const mongoose = require("mongoose");

const featuredWorkSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    title: {type: String},
    // e.g. Journal, Photo, Game, App, etc.
    type: {type: String, default: ""},
    description: {type: String, default: ""},
    fileLink: {type: String, default: ""},
    image: {type: String, default: ""},
    // Could be a link to another site or a reflection
    url: {type: String, default: ""}
});

const FeaturedWork = mongoose.model("FeaturedWork", featuredWorkSchema);
module.exports = {
    FeaturedWork,
    featuredWorkSchema
};