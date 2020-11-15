const mongoose = require("mongoose");

// This is a project/achievement/creative works that the user chooses to display
const featuredWorkSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  // e.g. Journal, Photo, Game, App, etc.
  type: { type: String, default: "" },
  description: { type: String, default: "" },
  // This is a downloadable document that relates to the featured work
  // fileLink: {type: String, default: ""},
  attachedFiles: [
    {
      documentID: { type: String },
      fileLink: { type: String },
    },
  ],
  // attachedFile: {
  //     documentID: {type: String},
  //     fileLink: {type: String}
  // },
  // Holds the id of the image
  image: { type: String },
  // Could be a link to another site or a reflection
  url: [{ type: String }],
});

const FeaturedWork = mongoose.model("FeaturedWork", featuredWorkSchema);
module.exports = {
  FeaturedWork,
  featuredWorkSchema,
};
