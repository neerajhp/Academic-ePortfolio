const express = require("express");
const router = express.Router();
const imageUpload = require("../Middleware/imageUpload");
const multer = require("multer");

router.get("/", (req, res) => {
    res.send("This is the upload page");
});

router.post("/image", imageUpload.imageUpload, (req, res) => {
    if(req.file){
        res.status(200).send("image saved");
    }else{
        console.log("nada");
    }
    // imageUpload(req, res, (err) => {
    //     if(err instanceof multer.MulterError){
    //         console.log(err);
    //         res.status(400).send({
    //             error: "A multer error has occurred"
    //         });
    //     }else if(err){
    //         res.status(400).send({
    //             error: "An unknown error has occurred"
    //         })
    //     }
    // });
});

module.exports = router;