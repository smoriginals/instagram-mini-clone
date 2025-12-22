import userstoryModel from '../Models/userstory.model.js';
import usersignupModel from '../Models/usersignup.model.js';
import cloudinary from '../Middleware/cloudinary.js';
import fs from 'fs';

export default async function uploadStory(req, res) {

    try {
        const { userId } = req.body;
        // 1️⃣ Validate user
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId required",
            });
        }

        const user = await usersignupModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user Found"
            })
        }

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Image requires"
            })
        }

        const userStory = await cloudinary.uploader.upload(req.file.path, { folder: "Story", resource_type: 'image' });
        if (!userStory?.secure_url) {
            throw new Error("Cloudinary upload failed");
        }


        const story = await userstoryModel.create({
            userId,
            image: userStory.secure_url,
            imageId:userStory.public_id,
        })

       
        return res.status(201).json({
            success: true,
            message: "Story is Live!", story
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server not Responding..."
        });
    }
    finally {

        if (req.file?.path) {
            fs.unlink(req.file.path, () => { });
        }
    }

} 