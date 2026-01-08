import cloudinary from '../Middleware/cloudinary.js';
import usersignupModel from '../Models/usersignup.model.js';


export default async function profilePicture(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const { userId } = req.body;
        // Find user
        const user = await usersignupModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let result;

        result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'Profile Pictures' },
                (error, uploadResult) => {
                    if (error) return reject(error);
                    resolve(uploadResult);
                }
            );
            stream.end(req.file.buffer);
        });

        //if (process.env.NODE_ENV === 'production') {
        //result = await new Promise((resolve, reject) => {
        //    cloudinary.uploader.upload_stream({ folder: 'Profile Pictures' }, (error, uploadResult) => {
        //        if (error) {
        //            return reject(error);
        //            resolve(uploadResult)
        //        }
        //    }).end(req.file.buffer);
        //})

        //} else {
        //    // Upload to Cloudinary
        //    result = await cloudinary.uploader.upload(req.file.path,
        //        { folder: 'Profile Pictures' }
        //    );


        //}


        // Delete old cloudinary image if exists
        if (user.userProfileId) {
            await cloudinary.uploader.destroy(user.userProfileId);
        }

        // Save new image URL + public_id
        user.userProfile = result.secure_url;
        user.userProfileId = result.public_id;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            url: result.secure_url,
            user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error uploading image",
            error: err.message
        });
    }

}