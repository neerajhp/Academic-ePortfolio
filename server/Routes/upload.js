const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const parse = require("../Middleware/upload");
const uploadController = require("../Controllers/uploadController");

router.get("/", (req, res) => {
    res.sendFile(path.resolve("./server/public/upload.html"))
});

router.post("/image", parse.imageUpload, uploadController.uploadImage);

// router.post("/image", parse.imageUpload, (req, res) => {
//     if(req.file){
//         res.status(200).send("image saved");
//     }else{
//         console.log("nada");
//     }
//     // upload.imageUpload(req, res, (err) => {
//     //     if(err instanceof multer.MulterError){
//     //         console.log(err);
//     //         res.status(400).send({
//     //             error: "A multer error has occurred"
//     //         });
//     //     }else if(err){
//     //         res.status(400).send({
//     //             error: "An unknown error has occurred"
//     //         })
//     //     }
//     // });
// });

module.exports = router;
