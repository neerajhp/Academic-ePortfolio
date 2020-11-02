const mongoose = require("mongoose");

// Represents employment history, volunteering experience and club experience
const experienceSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  type: {
    type: String,
    enum: ["employment", "volunteering", "extracurricular"],
    required: true,
  },
  // This could be the name of the company, volunteering organization or club/activity name
  organization: { type: String, required: true },
  // The role that the user has/had during their stint with the organization
  role: { type: String, required: true },
  // If full time/ part time/ casual
  employeeStatus: { type: String },
  yearStart: { type: Number, required: true },
  yearEnd: { type: Number },
  monthStart: { type: Number, required: true },
  monthEnd: { type: Number },
  // A short paragraph or 2 abt the user's experience
  description: { type: String },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
