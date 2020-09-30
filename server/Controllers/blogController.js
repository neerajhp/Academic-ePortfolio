const Blog = require("../Models/Blog");

// Post a new blog
const postBlog = async (req, res) => {
   try{
        const newBlog = new Blog({
            user_id: req.user.id,
            title: req.body.title,
            date_created: req.body.date_created,
            content: req.body.content,
            //images: req.body.images
        });
        await Blog.find({user_id: req.user.id, title: newBlog.title}, (err, result) => {
            if(err){
                console.log("Error found");
                throw (err);
            }else{
                if(!result || result.length === 0){
                    newBlog.save((err, doc) => {
                        if(err){
                            res.status(400).json(err);
                        }else{
                            res.status(200).json(doc);
                        }
                    });
                }else{
                    res.status(400).json("A blog with the same title already exists");
                }
            }
        });
    }catch(error){
        res.status(400).json("Failed to post blog");
    }
}

// Gets all of the user's blogs (API)
const getAllBlogs = async (req, res) => {
    try{
        let blogs = await findBlogs(req.user.id);
        if(!blogs || blogs.length === 0){
            res.status(400).json("No blogs found");
        }else{
            res.status(200).json(blogs);
        }
    }catch(error){
        res.status(400).json("Error occured while looking for blogs");
    }
}

// Gets all of the blogs pf the user that's being viewed
const viewerGetAllBlogs = async (req, res) => {
    try{
        const userID = req.body.id;
        let blogs = await findBlogs(userID);
        if(!blogs || blogs.length === 0){
            res.status(400).json("No blogs found");
        }else{
            res.status(200).json(blogs);
        }
    }catch(error){
        res.status(400).json("Error occured while looking for blogs");
    }
}

// function that looks for all of the user's blogs
const findBlogs = async (userID) => {
    let blogs;
    await Blog.find({user_id: userID}, (err, result) => {
        if(err){
            throw err;
        }else{
            blogs = result;
        }
    });
    return blogs;
}

// Gets a specific blog
const getBlog = async (req, res) => {
    try{
        await Blog.findById({_id: req.params.id, user_id: req.user.id}, (err, result) => {
            if(err){
                throw err;
            }else{
                if(result){
                    res.status(200).json(result);
                }else{
                    res.status(404).json("Blog not found");
                }
            }
        });
    }catch(error){
        res.status(400).json("Error occured while looking for the blog post");
    }
}

// Update the blog specified by params.id
const updateBlog = async (req, res) => {
    try{
        await Blog.updateOne({_id: req.params.id, user_id: req.user.id}, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                dateCreated: req.body.dateCreated
            }
        }, (err, result) => {
            if(err){
                console.log("something's up");
                res.status(404).send(err);
            }else{
                if(!result){
                    res.status(400).json("Nothing was changed");
                }else{
                    console.log("successfully updated");
                    Blog.findById({_id: req.params.id}, (err, result) => {
                        if(err){
                            throw err;
                        }else{
                            res.status(200).json(result);
                        }
                    });
                }
            }
        })
    }catch(error){
        res.status(400).json("Something happened");
    }
}

// Deletes the blog specified by params.id
const deleteBlog = async (req, res) => {
    try{
        await Blog.deleteOne({_id: req.params.id, user_id: req.user.id}, (err, result) => {
            if(err){
                throw err;
            }else{
                if(!result || result.deletedCount === 0){
                    res.status(400).json("Nothing was deleted");
                }else{
                    res.status(200).json("The blog has been deleted");
                }
            }
        })
    }catch(error){
        res.status(400).json("Error occured while deleting the blog");
    }
}

// Removes all of the user's blogs (API)
const clearBlogs = async (req, res) => {
    try{
        let deleteCount = await removeAllBlogs(req.user.id);
        console.log(deleteCount);
        if(deleteCount > 0){
            res.status(200).json(`${deleteCount} entries have been deleted`);
        }else{
            res.status(400).json("There were no blogs to delete");
        }
    }catch(error){
        res.status(400).send(error);
    }
}

// Function to remove all of the user's blogs
const removeAllBlogs = async (userID) => {
    let deleteCount;
    await Blog.deleteMany({user_id: userID}, (err, result) => {
        console.log("About to delete");
        if(err){
            console.log("error occured");
            res.status(400).json("Failed to delete blogs")
        }else{
            if(!result){
                console.log("Somehow there's no result");
                throw new Error();
            }else{
                console.log("The user's blogs have been cleared");
                deleteCount = result.deletedCount;
            }
        }
    });
    return deleteCount;
}

// const dateFormatter = (dateStr) => {
//     var date = new Date(dateStr);
//     console.log(date.toString());
//     console.log(date.getDate());
//     console.log(date.getFullYear());
//     console.log(date.getDay());
//     console.log(date.toDateString());
// }

module.exports = {
    postBlog,
    getAllBlogs,
    viewerGetAllBlogs,
    getBlog,
    deleteBlog,
    clearBlogs,
    removeAllBlogs,
    updateBlog
}