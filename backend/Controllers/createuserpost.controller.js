import usersignupModel from '../Models/usersignup.model.js';
import userpostsModel from '../Models/userposts.model.js';
import cloudinary from '../Middleware/cloudinary.js';


export default async function createUserPost(req, res) {

    try {

        const { title, caption, userId } = req.body;

        if (!req.file) {
            return res.status(400).json({success:false,message:"Upload Field!"})
        }

        const postResult = await cloudinary.uploader.upload(req.file.path)
        const user = await usersignupModel.findById(userId);

        if (!user) {
            return res.status(404).json({success:false,message:"User Not Found"})
        }

        const newPost = new userpostsModel({
            title, caption, userId,
            image: postResult.secure_url,
            imageId:postResult.public_id,
        })
        await newPost.save();

        user.posts.push(newPost._id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Post Uploaded Successfully",
            url: postResult.secure_url,
            post:newPost,
            //user,
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error uploading image",
            error: error.message
        });
    }
}