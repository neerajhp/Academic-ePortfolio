const express = require("express");
const router = express.Router();

const AWS = require("aws-sdk");
const Document = require("../Models/Document");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});


// Get all documents that belong to the user
router.get("/", async(req, res) => {
    try{
        // ideally, its probbaly better if the user_id is not from the query
        const documents = await Document.find({user_id: req.query.user_id});
        res.json(documents);
    }catch(err){
        console.log(err);
        res.json({error: "Something's up"});
    }
});


// Gets the document based on the given object id
// I might put this method in a filescontroller
router.get("/:id", async (req, res, next) => {
    await Document.findById(req.params.id, (err, doc) => {
        if(err){
            console.log("File not found");
            return next(err);
        }

        if(!doc){
            console.log("File not found");
        }else{
            var params = {
                Bucket: "documents-eportfolio",
                Key: doc.s3_key
            }
            s3.getObject(params, (err, data) => {
                if(err){
                    console.log(err);
                    console.log("error in callback");
                }else{
                    console.log("success");
                }
            })
            res.json(doc.s3_key);
            console.log("File found");
        }
        
    })
});

module.exports = router;