import userpostsModel from '../Models/userposts.model.js';
import usersignupModel from '../Models/usersignup.model.js';

export default async function CreatingPost(req, res) {
    try {
        const { title, image, caption,userId } = req.body;

        const user = await usersignupModel.findById(userId);
        if (!user) {
            return res.status(400).json({message:"Error Post not created"})
        }

        const post = new userpostsModel({ title, image, caption, userId });
        await post.save();


        await usersignupModel.findByIdAndUpdate(userId, {
            $push: {posts:post._id}
        })

        res.status(201).json({message:'Post created successfuly...',post})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}