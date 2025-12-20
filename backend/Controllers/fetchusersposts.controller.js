import userpostsModel from '../Models/userposts.model.js';

export default async function fetchUsersPosts(req, res) {
    try {
        const posts = await userpostsModel.find().populate('userId', 'name userProfile').populate({
            path: 'comments.user',
            select:'name userProfile',
        }).sort({ created: -1 });

        return res.status(200).json({
            success: true,
            posts,
        })
    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "field to fetch posts",
            error:error.message
        })
    }
}