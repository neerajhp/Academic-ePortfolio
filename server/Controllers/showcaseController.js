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
        attachedFile: req.body.attachedFile,
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
    }, req.body, (err, result) => {
        if(err){
            console.log("something's up");
            res.status(404).json(err);
        }else{
            console.log(result);
            if(result.nModified === 0){
                res.status(400).json("Nothing was changed");
            }else{
                console.log("successfully updated");
                //res.status(200).json("featured work updated");
                FeaturedWork.findById({
                    _id: req.params.id
                }, function (err, updated) {
                    res.status(200).json(updated);
                });
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
            res.status(200).json(result);
            if(result.fileLink){
                console.log(result.fileLink);
            }
        }
    });

}

// Deletes a single featured work
// If we're gonna delete the attached file, we can:
// - Have the frontend check if the featuredWork has an attachedFile, and if they do call the delete file api (Attach the file's id to the request params).
// - Have the backend check if the featuredWork has an attachedFile, and if they do look for the document, then delete its s3 instance and record
const removeFeaturedWork = async (req, res) => {
    try{
        // await FeaturedWork.findById({_id: req.params.id}, (err, result) => {
        //     if(err){
        //         console.log("Error");
        //     }else{
        //         if(result.attachedFile){
                    
        //         }
        //     }
        // })
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
    }catch(error){
        res.status(400).send(error);
    }
}

// Delete all featured works API
const clearShowcase = async (req, res) => {
    try{
        let result = await removeAllFeaturedWorks(req.user.id);
        if(result > 0){
            res.status(200).json("All featured works have been removed");
        }else{
            res.status(400).json("No featured works to remove");
        }
    }catch(error){
        console.log(error);
        res.status(400).json("An error occured while trying to delete the user's featured works");
    }
}

// Finds and deletes all the featured works
const removeAllFeaturedWorks = async (userID) => {
    let deleteCount;
    await FeaturedWork.deleteMany({user_id: userID}, (err, result) => {
        if(err){
            console.log("Failed to delete everything");
            throw err;
        }else{
            if(!result){
               throw new Error();
            }else{
                console.log("deleted");
                deleteCount = result.deletedCount;
            }
        }
    });
    return deleteCount;
}

// Gets all of the user's featured works
const getAllFeaturedWorks = async (req, res) => {
    try{
        let showcase = await findShowcase(req.user.id);
        if(showcase){
            res.status(200).json(showcase);
        }else{
            res.status(400).json("No featured works");
        }
    }catch(error){
        res.status(400).json("Error while looking for showcase");
    }
    // await FeaturedWork.find({user_id: req.user.id}, (err, results) => {
    //     if(err){
    //         console.log("The user does not have any featured works");
    //         res.status(404).json(err);
    //     }else{
    //         res.status(200).json(results);
    //     }
    // })
}

const viewerGetFeaturedWorks = async (req, res) => {
    try{
        const userID = req.viewID;
        let showcase = await findShowcase(userID);
        if(showcase){
            res.status(200).json(showcase);
        }else{
            res.status(400).json("The user has not featured any works");
        }
    }catch(error){
        res.status(400).json("Error while looking for viewer's showcase");
    }
}

// search all featured works
const findShowcase = async (userID) => {
    let showcase;
    await FeaturedWork.find({user_id: userID}, (err, result) => {
        if(err){
            throw err;
        }else{
            if(!result || result.length == 0){
                showcase = null
            }else{
                showcase = result;
            }
        }
    });
    return showcase;
}

//const getShowcase = 

module.exports = {
    createFeaturedWork,
    editFeaturedWork,
    getFeaturedWork,
    getAllFeaturedWorks,
    viewerGetFeaturedWorks,
    removeFeaturedWork,
    clearShowcase,
    removeAllFeaturedWorks
};