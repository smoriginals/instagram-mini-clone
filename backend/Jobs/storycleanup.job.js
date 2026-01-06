import userstoryModel from '../Models/userstory.model.js';
import cloudinary from '../Middleware/cloudinary.js';

export default async function cleanupExpireStory() {
    try {

        console.log("CRON is Initiating Stand By")

        const expireTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const expiredStories = await userstoryModel.find({
            createdAt: { $lt: expireTime },
        })

        for (const story of expiredStories) {
            //Delete from the cloud.

            if (story.imageId) {
                try {
                    const result = await cloudinary.uploader.destroy(story.imageId)
                }
                catch (error) {
                    console.error(
                        "Cloudinary delete failed for:",
                        story.imageId,
                        cloudErr.message
                    );
                    continue; // 🚨 skip DB delete, retry next CRON
                }
                //console.log("Cloudinary delete:", story.imageId, result);
            }
            //Deleting in DATABASE
            await userstoryModel.findByIdAndDelete(story._id);

        }
        console.log(`CRON Online... User Story's : ${expiredStories.length}`);

    } catch (error) {
        console.log("Failed to cleanup the stories", error.message);
    }
}
