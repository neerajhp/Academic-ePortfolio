const FeaturedWork = require("../Models/FeaturedWork").FeaturedWork;
const Showcase = require("../Models/Showcase");

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
            featuredWork.save();
            res.status(200).json("Featured work created");
        }else{
            res.status(400).json("A featured work with the same title already exists");
        }
    });
}

module.exports = {
    createFeaturedWork
};