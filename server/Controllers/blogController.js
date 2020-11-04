const Blog = require("../Models/Blog");

// Post a new blog
const postBlog = async (req, res) => {
  try {
    const newBlog = new Blog({
      user_id: req.user.id,
      title: req.body.title,
      date_created: req.body.date_created,
      content: req.body.content,
      images: req.body.images,
    });
    await Blog.find(
      { user_id: req.user.id, title: newBlog.title },
      (err, result) => {
        if (err) {
          console.log("Error found");
          throw err;
        } else {
          if (!result || result.length === 0) {
            newBlog.save((err, doc) => {
              if (err) {
                res.status(400).json(err);
              } else {
                res.status(200).json(doc);
              }
            });
          } else {
            res.status(400).json("A blog with the same title already exists");
          }
        }
      }
    );
  } catch (error) {
    res.status(400).json("Failed to post blog");
  }
};

// Gets all of the user's blogs (API)
const getAllBlogs = async (req, res) => {
  try {
    await Blog.find({ user_id: req.user.id }, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        let sortedBlogs = result.sort(customDateSort);
        res.status(200).json(sortedBlogs);
      } else {
        res.status(400).json("Failed to find blogs");
      }
    });
    // let blogs = await findBlogs(req.user.id);
    // if(!blogs){
    //     res.status(400).json("No blogs found");
    // }else{
    //     res.status(200).json(blogs);
    // }
  } catch (error) {
    res.status(400).json("Error occured while looking for blogs");
  }
};

const customDateSort = (a, b) => {
  return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
};

// Gets all of the blogs pf the user that's being viewed
const viewerGetAllBlogs = async (req, res) => {
  try {
    await Blog.find({ user_id: req.viewID }, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("Failed to find blogs");
      }
    });
    // let blogs = await findBlogs(userID);
    // if(!blogs){
    //     res.status(400).json("No blogs found");
    // }else{
    //     res.status(200).json(blogs);
    // }
  } catch (error) {
    res.status(400).json("Error occured while looking for blogs");
  }
};

// function that looks for all of the user's blogs
// const findBlogs = async (userID) => {
//     let blogs;
//     await Blog.find({user_id: userID}, (err, result) => {
//         if(err){
//             throw err;
//         }else{
//             blogs = result;
//         }
//     });
//     return blogs;
// }

// Gets a specific blog
const getBlog = async (req, res) => {
  try {
    await Blog.findById(
      { _id: req.params.id, user_id: req.user.id },
      (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json("Blog not found");
          }
        }
      }
    );
  } catch (error) {
    res.status(400).json("Error occured while looking for the blog post");
  }
};

// Update the blog specified by params.id
const updateBlog = async (req, res) => {
  try {
    await Blog.updateOne(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      (err, result) => {
        if (err) {
          console.log("something's up");
          res.status(404).json(err);
        } else {
          if (!result) {
            res.status(400).json("Nothing was changed");
          } else {
            console.log("successfully updated");
            Blog.findById({ _id: req.params.id }, (err, result) => {
              if (err) {
                throw err;
              } else {
                res.status(200).json(result);
              }
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(400).json("Something happened");
  }
};

// Add images to the reflection
const addImages = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { images: req.body.images },
      },
      { new: true },
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json("Blog entry not found");
        }
      }
    );
  } catch (error) {
    res.status(400).json("Error while trying to add images");
  }
};

// Removes the images specified in the body from the blog's images array
const removeImages = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(
      req.params.id,
      { $pull: { images: { $in: req.body.images } } },
      { new: true },
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json("Blog not found");
        }
      }
    );
  } catch (error) {
    res.status(400).json("Failed to remove specified images");
  }
};

// Deletes the blog specified by params.id
const deleteBlog = async (req, res) => {
  try {
    await Blog.findOneAndDelete(
      { _id: req.params.id, user_id: req.user.id },
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(400).json("Nothing was deleted");
        }
      }
    );
    // await Blog.findByIdAndDelete(req.params.id, (err, result) => {
    //     if(err){
    //         throw err;
    //     }else{
    //         if(!result){
    //             res.status(400).json("Nothing was deleted");
    //         }else{
    //             res.status(200).json(result);
    //         }
    //     }
    // })
  } catch (error) {
    res.status(400).json("Error occured while deleting the blog");
  }
};

// Removes all of the user's blogs (API)
const clearBlogs = async (req, res) => {
  try {
    let deleteCount = await removeAllBlogs(req.user.id);
    if (deleteCount > 0) {
      res.status(200).json(`${deleteCount} entries have been deleted`);
    } else {
      res.status(400).json("There were no blogs to delete");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// Function to remove all of the user's blogs
const removeAllBlogs = async (userID) => {
  let deleteCount;
  await Blog.deleteMany({ user_id: userID }, (err, result) => {
    console.log("About to delete");
    if (err) {
      console.log("error occured");
      throw err;
    } else {
      if (!result) {
        console.log("Somehow there's no result");
        deleteCount = 0;
      } else {
        console.log("The user's blogs have been cleared");
        deleteCount = result.deletedCount;
      }
    }
  });
  return deleteCount;
};

module.exports = {
  postBlog,
  getAllBlogs,
  viewerGetAllBlogs,
  getBlog,
  deleteBlog,
  clearBlogs,
  removeAllBlogs,
  updateBlog,
  addImages,
  removeImages,
};
