import usersignupModel from '../Models/usersignup.model.js';


export default async function profilePicture(req, res) {
    try {

        console.log("FILE RECEIVED:", req.file);  // 🔍 Check multer & Cloudinary
        const userId = req.body.userId;
        const imageFile = req.file.path;
        console.log("CLOUDINARY URL:", imageUrl); // 🔍 Check uploaded URL
        if (!imageFile) {
            return res.status(400).json({message:"Image not recieved"})
        }
        const user = await usersignupModel.findByIdAndUpdate(
            userId,
            {
                profilePhoto: imageFile
            },
            {
                new: true
            }
        )
        return res.json({
            message: "Profile Picture Uploded",
            profilePhoto:user.imageFile,
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Upload failed", error: err.message });
    }
}