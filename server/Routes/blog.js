const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogController");
const authenticate = require("../Middleware/authenticate");

router.use(authenticate.authenticateToken);

router.post("/", blogController.postBlog);

router.get("/", blogController.getAllBlogs);

router.delete("/", blogController.clearBlogs);

router.put("/:id", blogController.updateBlog);

module.exports = router;