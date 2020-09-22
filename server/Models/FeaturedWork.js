const mongoose = require("mongoose");

// This is a project/achievement/creative works that the user chooses to display
const featuredWorkSchema = mongoose.Schema({
    user_id: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String},
    // e.g. Journal, Photo, Game, App, etc.
    type: {type: String, default: ""},
    description: {type: String, default: ""},
    // This is a downloadable document that relates to the featured work
    // fileLink: {type: String, default: ""},
    fileLink: {type: mongoose.Schema.Types.ObjectId, ref: "Document", default: null},
    image: {type: String, default: ""},
    // Could be a link to another site or a reflection
    url: {type: String, default: ""}
});

const FeaturedWork = mongoose.model("FeaturedWork", featuredWorkSchema);
module.exports = {
    FeaturedWork,
    featuredWorkSchema
};