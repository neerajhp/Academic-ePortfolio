const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogController");
const { authenticateToken } = require("../Middleware/authenticate");

router.use(authenticateToken);


router.post("/", blogController.postBlog);

router.get("/", blogController.getAllBlogs);

router.delete("/", blogController.clearBlogs);

router.delete("/:id", blogController.deleteBlog);

router.put("/:id", blogController.updateBlog);

module.exports = router;