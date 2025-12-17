import cron from 'node-cron';
import userstoryModel from '../Models/userstory.model.js';
import cloudinary from '../Middleware/cloudinary.js';

export default async function cleanupExpireStory(){
    try {

        console.log("cron is running, Story cleaner...")

        const expireTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const expiredStories = await userstoryModel.find({
            createdAt: { $lt: expireTime },
        })

        for (const story of expiredStories) {
            //Delete from the cloude.
            if (story.imageId) {
                await cloudinary.uploader.destroy(story.imageId)
            }
            //Deleting in DATABASE
            await userstoryModel.findByIdAndDelete(story._id);

        }
        console.log(`Deleted Expired Stories | Left : ${expiredStories.length} `);

    } catch (error) {
        console.log("field to cleanup the stories", error.message);
    }
}
