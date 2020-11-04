const mongoose = require("mongoose");

//User Schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    //required: true
  },
  mobileNumber: {
    type: String,
  },
  // A json for social media links
  socialMedia: {
    linkedIn: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
  },
  biography: {
    type: String,
    default: "",
  },
  aboutMe: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  tutorial: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  private: {
    type: Boolean,
    default: false,
  },
});

// Binds the userSchema to a user model
const User = mongoose.model("User", userSchema);

module.exports = User;
