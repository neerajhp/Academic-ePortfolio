const express = require("express");
const router = express.Router();
const imageUpload = require("../Middleware/imageUpload");
var path = require('path')

router.get("/", (req, res) => {
    res.sendFile(path.resolve("./server/public/upload.html"))
});

router.post("/image", imageUpload, async (req, res) => {
    try{

    }catch(err){
        res.status(400).send({
            error: "An error has occurred"
        })
    }
})