// Allows the upload of images to the database
const uploadSingle = async (req, res) => {
    try{
        if(req.file){
            res.status(200).send("file saved");
        }else{
            throw Error();
        }
    }catch(err){
        res.status(400).send({error: "Unable to upload file."});
        console.log(err);
    }
};

// Allows the upload of multiple files
const uploadMultiple = async (req, res) => {
    try{
        console.log(req.files);

        if(req.files.length <= 0){
            res.send("You must select at least 1 file");
        }

        res.send("Files have been uploaded");
    }catch(err){
        res.status(400).send({error: "Unable to upload files."});
        console.log(err);
    }
};

module.exports = {
    uploadSingle,
    uploadMultiple
};
