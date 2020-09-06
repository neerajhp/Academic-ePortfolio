const Document = require("../Models/Document");
const AWS = require("aws-sdk");
require('dotenv').config();


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});


const getAllDocs = async (req, res) => {
    try{
        // ideally, its probbaly better if the user_id is not from the query
        const documents = await Document.find({user_id: req.query.userID});
        res.json(documents);
    }catch(err){
        console.log(err);
        res.json({error: "Something's up"});
    }
}

const getDocument = async (req, res, next) => {
    await Document.findById(req.params.id, (err, doc) => {
        if(err){
            console.log("File not found");
            return next(err);
        }

        if(!doc){
            console.log("File not found");
            res.status(404).json({error: "File not found"});
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
                    res.json(doc.fileLink);
                }
            })
            
            console.log("File found");
        }
        
    })
}

const deleteDocument = async (req, res, next) => {
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
            // Delete document in the s3 server
            s3.deleteObject(params, (err, data) => {
                if(err){
                    console.log(err);
                    console.log("error in callback");
                }else{
                    console.log("file removed from s3");
                }
            })
            //res.json(doc.s3_key);
            //console.log("File found");
        }
    });
    
    // Delete its reference in mongoDB 
    await Document.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            res.status(400).json(err);
        }else{
            console.log("file reference deleted");
            res.json({message: "Both the file and its reference have been deleted"});
        }
    });
}

module.exports = {
    getAllDocs,
    getDocument,
    deleteDocument
}