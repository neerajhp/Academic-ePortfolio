const FeaturedWork = require("../Models/FeaturedWork").FeaturedWork;
const Showcase = require("../Models/Showcase");

const uploadController = require("../Controllers/uploadController");
const filesController = require("../Controllers/filesController");

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
        image: req.body.image,
        url: req.body.url
    })

    await FeaturedWork.findOne({user_id: req.user.id, title: req.body.title}, (err, result) => {
        if(err){
            throw err;
        }
        if(result){
            res.status(400).json("A project with the same title already exists");
            return;
        }else{
            if(req.files){
                (async () => {
                    for(var i = 0; i < req.files.length; i++){
                        let savedFile;
                        let uploadedFile = await uploadController.saveFile(req.user.id, req.files[i]);
                        if(uploadedFile){
                            savedFile = {
                                fileLink: uploadedFile.fileLink
                            }
                            console.log(savedFile);
                            featuredWork["attachedFiles"].push(savedFile);
                        }else{
                            console.log("fuck");
                        }
                    }
                    // let savedFile;
                    // let uploadedFile = await uploadController.saveFile(req);
                    // console.log(uploadedFile);
                    // if(uploadedFile){
                    //     savedFile = {
                    //         fileLink: uploadedFile.fileLink
                    //     }
                    //     console.log(savedFile);
                    //     featuredWork["attachedFiles"].push(savedFile);
                    // }else{
                    //     console.log("fuck");
                    // }
                    
                    featuredWork.save((err, result) => {
                        if(err){
                            throw err;
                        }else{
                            res.status(200).json(result);
                        }
                    })
                })();

            }else{
                featuredWork.save((err, result) => {
                    if(err){
                        throw err;
                    }else{
                        res.status(200).json(result);
                    }
                })
            }
        }
    });
}





const addFiles = async (req, res) => {
    try{
        if(req.files){
            let newFiles = [];
            await (async () => {
                for(var i = 0; i < req.files.length; i++){
                    let savedFile;
                    let uploadedFile = await uploadController.saveFile(req.user.id, req.files[i]);
                    if(uploadedFile){
                        savedFile = {
                            //documentID: uploadedFile._id,
                            fileLink: uploadedFile.fileLink
                        }
                        console.log(savedFile);
                        newFiles.push(savedFile);
                    }else{
                        console.log("file not saved");
                        //res.status(400).json("Failed to save file");
                        //return;
                    }
                }
                // let savedFile;
                // let uploadedFile = await uploadController.saveFile(req);
                // console.log(uploadedFile);
                // if(uploadedFile){
                //     savedFile = {
                //         //documentID: uploadedFile._id,
                //         fileLink: uploadedFile.fileLink
                //     }
                //     console.log(savedFile);
                //     newFiles.push(savedFile);
                // }else{
                //     console.log("fuck");
                //     res.status(400).json("Failed to save file");
                //     return;
                // }
            })();

            await FeaturedWork.findOneAndUpdate({_id: req.params.id, user_id: req.user.id}, {$addToSet: { attachedFiles: newFiles },}, {new: true}, (err, result) => {
                console.log("abt to update");
                if(err){
                    throw err;
                }
                if(result){
                    console.log("sending response")
                    res.status(200).json(result);
                }else{
                    res.status(404).json("Featured work not found");
                }
            })
        }else{
            console.log("No file");
            res.status(400).json("No file to add");
        }
    }catch(err){
        res.status(400).json("Failed to add attached files to the featured work model");
    }
}

const removeFiles = async (req, res) => {
    try{
        await featuredWork.findByIdAndUpdate(req.params.id, {
            $pull: { attachedFiles: { $in: req.body.attachedFiles }}
        }, {new: true}, (err, result) => {
            if(err){
                throw err;
            }
            if(result){
                res.status(200).json(result);
                // Maybe call delete files api after calling this api?
            }
        })
    }catch(error){
        res.status(400).json("Failed to remove attached files");
    }
}

const addUrl = async (objectID, userID, url) => {
    //console.log("Add urls");
    let success;
    await FeaturedWork.findOneAndUpdate({_id: objectID, user_id: userID}, {$addToSet: { url: url },}, {new: true}, (err, result) => {
        if(err){
            //console.log("error found");
            throw err;
        }
        if(result){
            //console.log("updated");
            success = true;
        }else{
            //console.log("Featured work not found");
            success = false;
            //res.status(404).json("Featured work not found");
        }
    });
    return success;
    // try{
    //     let success;
    //     await FeaturedWork.findOneAndUpdate({_id: objectID, user_id: userID}, {$addToSet: { url: url },}, {new: true}, (err, result) => {
    //         if(err){
    //             throw err;
    //         }
    //         if(result){
    //             console.log("updated");
    //             success = true;
    //         }else{
    //             console.log("Featured work not found");
    //             success = false;
    //             //res.status(404).json("Featured work not found");
    //         }
    //     });
    // }catch(error){
    //     res.status(400).json("Failed to add url to the featured work model");
    // }
}

const removeUrl = async (req, res) => {
    try{
        await FeaturedWork.findByIdAndUpdate(req.params.id, {$pull: { url: {$in : req.body.url}},}, {new: true}, (err, result) => {
            if(err){
                throw err;
            }
            if(result){
                console.log("url removed");
                res.status(200).json(result);
            }else{
                res.status(404).json('Failed to find featured work with the specified id');
            }
        })
    }catch(error){
        res.status(400).json("Failed to remove a url");
    }
}


// Allows users to edit the properties of a featured work
const editFeaturedWork = async (req, res) => {
    try{
        //console.log("Start edit");
        // if(req.body.url != null){
        //     console.log("Time to add urls");
        //     await addUrl(req.params.id, req.user.id, req.body.url);
        //     delete req.body.url;
        //     // await addUrl(req.params.id, req.user.id, req.body.url, (err,result) => {
        //     //     if(err){
        //     //         throw err;
        //     //     }
        //     //     console.log(result);
        //     //     if(result){
        //     //         //console.log("Urls have been added");
        //     //         delete req.body.url;
        //     //     }else{
        //     //         //console.log("Failed to add urls");
        //     //         res.status(400).json("Failed to add urls");
        //     //         return;
        //     //     }
        //     // });
        //     // let urlSuccess = await addUrl(req.params.id, req.user.id, req.body.url);
        //     // if(urlSuccess){
        //     //     console.log("Urls have been added");
        //     //     delete req.body.url;
        //     // }else{
        //     //     console.log("Failed to add urls");
        //     //     res.status(400).json("Failed to add urls");
        //     //     return;
        //     // }
        // }else{
        //     console.log("No urls to add");
        // }
        
        await FeaturedWork.findByIdAndUpdate(
            req.params.id, req.body, {new: true}, (err, result) => {
            console.log("Time to update featured work");
            if(err){
                console.log("something's up");
                res.status(404).json(err);
            }else{
                if(result){
                    console.log("Abt to send a response");
                    res.status(200).json(result);
                }
            }
        });
    }catch(error){
        res.status(400).json("Error while updating");
    }
}

// Gets a specific featured work based on its object id
const getFeaturedWork = async (req, res) => {
    try{
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
    }catch(error){
        res.status(400).json("Error while looking for featured work");
    }

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
        await FeaturedWork.findByIdAndDelete(req.params.id, (err, result) => {
            if(err){
                console.log("failed to delete");
                throw err;
            }
            if(result){
                
                res.status(200).json({
                    message: "Successfully deleted featured work",
                    filesToDelete: result.attachedFiles
                });
            }else{
                res.status(404).json("Failed to find featured work");
            }
            
            
            // else{
            //     if(result.n === 0){
            //         console.log("nothing deleted");
            //         res.status(400).json("Attempted to delete something that doesn't exist");
            //     }else{
            //         console.log("deleted");
            //         res.status(200).json("successfully deleted featured work");
            //     }
            // }
        })
    }catch(error){
        res.status(400).send(error);
    }
}

// Delete all featured works API
const clearShowcase = async (req, res) => {
    try{
        let resultStatus = removeAllFeaturedWorks(req.user.id);
        resultStatus.then(async (result) => {
            if(result > 0){
                res.status(200).json("All featured works have been removed");
            }else{
                res.status(400).json("No featured works to remove");
            }
        })
        // if(result > 0){
        //     res.status(200).json("All featured works have been removed");
        // }else{
        //     res.status(400).json("No featured works to remove");
        // }
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
        await FeaturedWork.find({user_id: req.user.id}, (err, results) => {
            if(err){
                console.log("The user does not have any featured works");
                res.status(404).json(err);
            }else{
                res.status(200).json(results);
            }
        });
        // let showcase = await findShowcase(req.user.id);
        // if(showcase){
        //     res.status(200).json(showcase);
        // }else{
        //     res.status(400).json("No featured works");
        // }
    }catch(error){
        res.status(400).json("Error while looking for showcase");
    }
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


module.exports = {
    createFeaturedWork,
    editFeaturedWork,
    getFeaturedWork,
    getAllFeaturedWorks,
    viewerGetFeaturedWorks,
    addFiles,
    removeFiles,
    addUrl,
    removeUrl,
    removeFeaturedWork,
    clearShowcase,
    removeAllFeaturedWorks
};