const FeaturedWork = require("../Models/FeaturedWork").FeaturedWork;
const Showcase = require("../Models/Showcase");

const uploadController = require("../Controllers/uploadController");

// Initializes a showcase for the user
// This object will store the user's featured works (I might not user this)
const initShowcase = async (req, res) => {
    const showcase = new Showcase({
        user_id: req.user.id,
        featuredWorks: []
    })

    await Showcase.findOne({
        user_id: req.user.id
    }).then(async (result) => {
        if(!result){
            showcase.save((err, doc) => {
                if(err){
                    res.status(400).json(err);
                }else{
                    res.status(200).json(doc);
                }
            })
        }else{
            res.status(400).json("User already has a showcase");
        }
    })
}

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

    // Looks for an existing featured work with the same title
    await FeaturedWork.findOne({
        user_id: req.user.id,
        title: req.body.title
    }).then(async (work) => {
        if(!work){
            // If there is none, then the new featured work can be created
            featuredWork.save((err, doc) => {
                if(err){
                    res.status(400).json(err);
                }else{
                    res.status(200).json(doc);
                }
            })
        }else{
            res.status(400).json("A featured work with the same title already exists");
        }
    });
}

// Allows users to edit the properties of a featured work
const editFeaturedWork = async (req, res) => {
    await FeaturedWork.updateOne({
        user_id: req.user.id,
        _id: req.params.id
    }, {
        // Edits all the properties included in the $set
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
                res.status(400).json("Attempted to add nothing to the skills array");
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

// Delete all featured works API
const clearShowcase = async (req, res) => {
    try{
        let result = await removeAllFeaturedWorks(req.user.id);
        if(!result){
            res.status(400).json("No featured works to remove");
        }else{
            res.status(200).json("All featured works have been removed");
        }
    }catch(error){
        console.log(error);
        res.status(400).json("An error occured while trying to delete the user's featured works");
    }
}

// Finds and deletes all the featured works
const removeAllFeaturedWorks = async (userID) => {
    let deleteStatus;
    await FeaturedWork.deleteMany({user_id: userID}, (err, result) => {
        if(err){
            console.log("Failed to delete everything");
            throw err;
        }else{
            if(result.deletedCount === 0){
                //console.log(result);
                console.log("nothing deleted");
                deleteStatus = false;
            }else{
                console.log("deleted");
                //console.log(result);
                deleteStatus = true;
            }
        }
    });
    return deleteStatus;
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
    removeFeaturedWork,
    clearShowcase,
    removeAllFeaturedWorks
};