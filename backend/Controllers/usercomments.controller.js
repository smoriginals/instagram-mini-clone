import userpostsModel from '../Models/userposts.model.js';

export default async function userComments(req, res) {
    try {
        const { userId, text } = req.body;
        const postId = req.params.id;

        if (!userId || !text) {
            return res.status(400).json({
                success: false,
                message:'missing field',
            })
        }
        const post = await userpostsModel.findById(postId);
        if (!post) {
            return res.status(404).json({success:false,message:'Page not found'})
        }
        post.comments.push({ user: userId, text })
        await post.save();

        await post.populate('comments.user', 'name userProfile')

        return res.status(200).json({
            success: true,
            comments:post.comments
        })
    }
    catch (error) {
        return res.ststus(400).json({success:false,message:error.message})
    }
}