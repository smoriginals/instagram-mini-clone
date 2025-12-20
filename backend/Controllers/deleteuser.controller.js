import usersignupModel from '../Models/usersignup.model.js';
import userpostsModel from '../Models/userposts.model.js';
import cloudinary from '../Middleware/cloudinary.js'

export default async function deleteUser(req,res) {
    try {
        const { _id } = req.body;

        if (!_id) return res.status(400).json({ message: "User ID missing" });

        // 1️⃣ Get user first (IMPORTANT)
        const user = await usersignupModel.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userPosts = await userpostsModel.find({ userId: _id });

        for (const post of userPosts) {
            if (post.imageId) {
                await cloudinary.uploader.destroy(post.imageId);
            }
        }
        await userpostsModel.deleteMany({ userId: _id });

        if (user.userProfileId) {
            await cloudinary.uploader.destroy(user.userProfileId)
        }

        await usersignupModel.findByIdAndDelete(_id);

        res.json({ ok: true, message: "User and all related data deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ success:false,message: "Network Error", error:error.message })
    }
   
}
