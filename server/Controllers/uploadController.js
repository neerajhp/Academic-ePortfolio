const uploadImage = async (req, res) => {
    try{
        if(req.file){
            res.status(200).send("image saved");
        }else{
            throw Error();
        }
    }catch(err){
        res.status(400).send({error: "Unable to upload image."});
    }
}

module.exports = {
    uploadImage,
};
