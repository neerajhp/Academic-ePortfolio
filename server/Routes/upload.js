const express = require("express");
const router = express.Router();
const imageUpload = require("../Middleware/imageUpload");

router.get("/", (req, res) => {
    res.send("This is the upload page");
});

router.post("/image", imageUpload, async (req, res) => {
    try{

    }catch(err){
        res.status(400).send({
            error: "An error has occurred"
        })
    }
})