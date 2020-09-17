const FeaturedWork = require("../Models/FeaturedWork").FeaturedWork;
const Showcase = require("../Models/Showcase");

const uploadController = require("../Controllers/uploadController");

const createFeaturedWork = async (req, res) => {
    const featuredWork = new FeaturedWork({
        user_id: req.user.id,
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        fileLink: req.body.fileLink,
        image: req.body.image,
        url: req.body.url
    });

    await FeaturedWork.findOne({
        user_id: req.user.id,
        title: req.body.title
    }).then(async (work) => {
        if(!work){
            featuredWork.save((err, doc) => {
                if(err){
                    res.status(400).json(err);
                }else{
                    res.status(200).json(doc);
                }
            })
            //res.status(200).json("Featured work created");
        }else{
            res.status(400).json("A featured work with the same title already exists");
        }
    });
}

// Allows users to edit the title, type, description and url (link to some other site) of a featured work
const editFeaturedWork = async (req, res) => {
    await FeaturedWork.updateOne({
        user_id: req.user.id,
        _id: req.params.id
    }, {
        $set: {
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
            fileLink: req.body.fileLink,
            image: req.body.image,
            url: req.body.url
        }
    }, (err, result) => {
        if(err){
            console.log("something's up");
            res.status(404).json(err);
        }else{
            if(result.nModified === 0){
                res.json("Attempted to add nothing to the skills array");
            }else{
                console.log("successfully updated");
                res.status(200).json("featured work updated");
            }
        }
    });
}

// Gets a specific featured work based on its object id
const getFeaturedWork = async (req, res) => {
    await FeaturedWork.findById(req.params.id, (err, result) => {
        if(err){
            console.log("Featured work not found");
            res.status(404).json(err);
        }else{
            console.log(result);
            res.status(200).json(result);
        }
    });

}

// Deletes a single featured work
const removeFeaturedWork = async (req, res) => {
    await FeaturedWork.deleteOne({_id: req.params.id}, (err, result) => {
        if(err){
            console.log("failed to delete");
            res.status(400).send(err);
        }else{
            if(result.n === 0){
                console.log("nothing deleted");
                res.status(400).json("Attempted to delete something that doesn't exist");
            }else{
                console.log("deleted");
                res.status(200).json("successfully deleted featured work");
            }
        }
    })
}

// Gets all of the user's featured works
const getAllFeaturedWorks = async (req, res) => {
    await FeaturedWork.find({user_id: req.user.id}, (err, results) => {
        if(err){
            console.log("The user does not have any featured works");
            res.status(404).json(err);
        }else{
            console.log(results.length);
            res.status(200).json(results);
        }
    })
}

//const getShowcase = 

module.exports = {
    createFeaturedWork,
    editFeaturedWork,
    getFeaturedWork,
    getAllFeaturedWorks,
    removeFeaturedWork
};