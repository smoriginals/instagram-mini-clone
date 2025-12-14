import userpostsModel from '../Models/userposts.model.js';

export default async function addLikes(req,res) {
    try {
        const { userId } = req.body;
        const postId = req.params.id;
        //const userId = req.user?.id || req.body.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized..." })
        }

        const post = await userpostsModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not Found..."
            })
        }

        const alreadyLiked = post.likes.includes(userId);
        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() != userId.toString());
        } else {
            post.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            totalLikes: post.likes.length,
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error:error.message,
        })
    }
}