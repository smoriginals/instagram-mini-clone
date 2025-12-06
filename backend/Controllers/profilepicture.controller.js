//import usersignupModel from '../Models/usersignup.model.js';
//import express from 'express';
import cloudinary from '../Middleware/cloudinary.js';
//import upload from '../Middleware/upload.js';

//const router = express.Router();

export default async function profilePicture(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message:"No File Recieved:",
            })
        }
        const result = await cloudinary.uploader.upload(req.file.path);

        return res.status(200).json({
            success: true,
            message: 'Uploaded!',
            url: result.secure_url,

        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Upload failed",
            error:error.message,
        })
    }

    //Method - 0 
    //cloudinary.uploader.upload(req.file.path, function (err, result) {
    //    if (err) {
    //        console.log(err);
    //        return res.status(500).json({
    //            success: false,
    //            message:"Error",
    //        })
    //    }
    //})

    //res.status(200).json({
    //    success: true,
    //    message: "Uploaded!",
    //    data:result,
    //})

    //Method - 1
    //try {
    //    console.log("FILE RECEIVED:", req.file);

    //    const userId = req.body.userId;

    //    if (!req.file) {
    //        return res.status(400).json({ message: "Image not received" });
    //    }

    //    const imageFile = req.file.path;  // Cloudinary URL

    //    console.log("UPLOADED URL:", imageFile);

    //    const user = await usersignupModel.findByIdAndUpdate(
    //        userId,
    //        { profilePhoto: imageFile },
    //        { new: true }
    //    );

    //    if (!user) {
    //        return res.status(404).json({ message: "User not found" });
    //    }

    //    return res.json({
    //        message: "Profile picture uploaded",
    //        profilePhoto: user.profilePhoto,
    //    });

    //} catch (err) {
    //    console.log("UPLOAD ERROR:", err);
    //    res.status(500).json({ message: "Upload failed", error: err.message });
    //}



    //Method - 2 
    //try {
    //    //console.log("FILE RECEIVED:", req.file);  // 🔍 Check multer & Cloudinary

    //    const userId = req.body.userId;
    //    const imageFile = req.file.path;

    //    //console.log("CLOUDINARY URL:", imageFile); // 🔍 Check uploaded URL

    //    if (!imageFile) {
    //        return res.status(400).json({ message: "Image not recieved" })
    //    }
    //    const user = await usersignupModel.findByIdAndUpdate(
    //        userId,
    //        {
    //            profilePhoto: imageFile
    //        },
    //        {
    //            new: true
    //        }
    //    )
    //    return res.json({
    //        message: "Profile Picture Uploded",
    //        profilePhoto: user.profilePhoto,
    //    })
    //}
    //catch (err) {
    //    console.log(err);
    //    res.status(500).json({ message: "Upload failed", error: err.message });
    //}
}