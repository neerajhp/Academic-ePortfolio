const express = require("express");
const router = express.Router();
const filesController = require("../Controllers/filesController");
const { authenticateToken } = require("../Middleware/authenticate");

router.use(authenticateToken);

// Get all documents that belong to the user
router.get("/", filesController.getAllDocs);

router.get("/image/:id", filesController.displayPicture);

router.get("/download/:id", filesController.downloadFile);

router.delete("/cv", filesController.deleteCV);

router.delete("/profile-pic", filesController.deleteProfilePic);

router.get("/image/profile-pic", filesController.displayProfilePic);

router.delete("/", filesController.deleteAllFiles);

router.delete("/delete", filesController.deleteMultiple);

// Gets the document based on the given object id
// I might put this method in a filescontroller
router.get("/:id", filesController.getDocument);

// Deletes a document based on its mongoDB id
router.delete("/:id", filesController.deleteDocument);

module.exports = router;
