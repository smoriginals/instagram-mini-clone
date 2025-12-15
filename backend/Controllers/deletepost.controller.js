import userpostsModel from '../Models/userposts.model.js';
import cloudinary from '../Middleware/cloudinary.js';


export default async function deletePost(req, res) {

    try {
        const { id:postId } = req.params;
        const { userId } = req.body;

        const post = await userpostsModel.findById(postId);
        if (!post) {
            return res.status(404).json({success:false,message:"Post not Found..."})
        }

        if (post.userId.toString() !== userId.toString()) {
            return res.status(403).json({success:false,message:"Not Allowed..."})
        }

        if (post.imageId) {
            await cloudinary.uploader.destroy(post.imageId)
        }

        await post.deleteOne();

        return res.status(200).json({
            success: true,
            message:"post deleted"
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message:"Server not Responding..."
        })
    }
}