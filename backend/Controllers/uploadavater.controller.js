import usersignupModel from "../Models/usersignup.model.js";
import { V2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudKey: process.env.CLOUDINARY_API_KEY,
    cloudSecret: process.env.CLOUDINARY_API_SECRET
})

export default async function uploadAvater(req, res) {
    try {
        const file = req.body;
        if (!file) {
            res.status(400).json({ message: "No file uploaded" })
        }
        //upload to cloudinary
        const uploadToCloudinary = await cloudinary.uploader.upload(file.path, {
            folder: "profileavater",
        })

        //update the database
        const updateUser = await usersignupModel.findByIdAndUpdate(req.user._id,
            { profilePicture: uploadToCloudinary.secure_url },
            { new: true }
        );
        res.json({
            message: "Avatar updated",
            profilePic: uploadResult.secure_url,
            user: updatedUser
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Upload failed", error: err.message });
    }
}