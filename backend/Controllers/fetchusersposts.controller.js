import userpostsModel from '../Models/userposts.model.js';
import usersignupModel from '../Models/usersignup.model.js';

export default async function fetchUsersPosts(req, res) {
    try {
        const userId = req.userId;

        // 1. Get logged-in user
        const user = await usersignupModel.findById(userId).select("following role");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const owner = await usersignupModel.findOne({role:'owner'}).select('_id')

        // 2. Allowed users = following + myself
        const allowedUsers = [...user.following, userId,...(owner?[owner._id]:[])];

        // 3. Fetch posts only from allowed users
        const posts = await userpostsModel
            .find({ userId: { $in: allowedUsers } })
            .populate('userId', 'name username userProfile role')
            .populate({
                path: 'comments.user',
                select: 'name userProfile',
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            posts,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
            error: error.message
        });
    }
}
