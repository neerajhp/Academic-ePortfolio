const express = require("express");
const router = express.Router();
const filesController = require("../Controllers/filesController");


// Get all documents that belong to the user
router.get("/", filesController.getAllDocs);

// Gets the document based on the given object id
// I might put this method in a filescontroller
router.get("/:id", filesController.getDocument);

// Deletes a document based on its mongoDB id
router.delete("/:id", filesController.deleteDocument);

module.exports = router;