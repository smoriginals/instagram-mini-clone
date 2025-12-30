import usersignupModel from "../Models/usersignup.model.js";

export default async function userFollow(req, res) {
    try {
        const targetUserId = req.params.id;   // URL param user to follow
        const loggedInUserId = req.userId;    // from Auth middleware

        //don't follow your self
        if (targetUserId===loggedInUserId ) {
            return res.status(403).json({
                success: false,
                message:'You cannot follow yourself.'
            })
        }
        //fetch users
        const loggedIn = await usersignupModel.findById(loggedInUserId);
        const targetTo = await usersignupModel.findById(targetUserId);

        if (!loggedIn || !targetTo) {
            return res.status(404).json({
                success: false,
                message:'User not found!'
            })
        }
        //protection of owner
        if (targetTo.role === 'owner') {
            return res.status(401).json({
                success: false,
                message:'Owner cannot be follow!'
            })
        }
        //check follow status
        //const isFollowing = loggedIn.following.includes(targetUserId);
        const isFollowing = loggedIn.following.map(id => id.toString()).includes(targetUserId);

        if (isFollowing) {
            //unfollow  
            await usersignupModel.findByIdAndUpdate(loggedInUserId, {
                $pull: { following: targetUserId }
            })
            await usersignupModel.findByIdAndUpdate(targetUserId, {
                $pull: { followers: loggedInUserId }
            })
            return res.status(200).json({
                success: true,
                action: "unfollowed",
                message: "User unfollowed",
            })
        } else {
            //follow
            await usersignupModel.findByIdAndUpdate(loggedInUserId, {
                $addToSet: {following:targetUserId}
            })
            await usersignupModel.findByIdAndUpdate(targetUserId, {
                $addToSet: {followers:loggedInUserId}
            })
            return res.status(200).json({
                success: true,
                action: "followed",
                message: "User followed",
            })
        }

    } catch (error) {
        console.error("Follow Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}