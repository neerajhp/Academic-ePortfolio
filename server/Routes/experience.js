const express = require("express");
const router = express.Router();
const expController = require("../Controllers/experienceController");
const { authenticateToken } = require("../Middleware/authenticate");

router.use(authenticateToken);

// Gets all of the user's experiences
router.get("/", expController.getAllExperience);

// Creates an experience record
router.post("/", expController.addExperience);

// Gets employment history
router.get("/employment", expController.getEmploymentHistory);

// Gets volunteering history
router.get("/volunteering", expController.getVolunteeringHistory);

// Gets extracurriculars
router.get("/extracurriculars", expController.getExtracurriculars);

// Deletes all experience
router.delete("/delete", expController.deleteAllExperience);

// Gets a specific experience based on id
router.get("/:id", expController.getExperience);

// Edits a specific experience
router.put("/edit/:id", expController.editExperience);

// Deletes a specific experience
router.delete("/delete/:id", expController.deleteExperience);

module.exports = router;
