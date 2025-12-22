import userstoryModel from '../Models/userstory.model.js';
import cloudinary from '../Middleware/cloudinary.js';
import mongoose from 'mongoose';

export default async function deleteUserStory(req,res) {

    try {

        const { id: storyId } = req.params;
        const { userId } = req.body;


        if (!storyId || !userId) {
            return res.status(400).json({
                success: false,
                message:'Story Id and UserId required!'
            })
        }

        const story = await userstoryModel.findById(storyId);
        if (!mongoose.Types.ObjectId.isValid(storyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid story ID",
            });
        }
        if (!story) {
            return res.status(404).json({success:false,message:'no data'})
        }

        if (story.userId.toString() !== userId.toString()) {
            return res.status(403).json({success:false,message:'no story user'})
        }

        if (story.imageId) {
            try {
                await cloudinary.uploader.destroy(story.imageId);
            } catch (cloudErr) {
                console.error("Cloudinary delete failed:", cloudErr.message);
            }
        }

        //await story.deleteOne();
        await userstoryModel.findByIdAndDelete(storyId);

        return res.status(200).json({ success: true, message: 'user deleted', storyId })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Server Error'
        })
    }

}