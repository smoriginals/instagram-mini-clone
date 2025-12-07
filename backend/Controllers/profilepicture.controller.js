import cloudinary from '../Middleware/cloudinary.js';

export default async function profilePicture(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const { userId } = req.body; // if needed
        const result = await cloudinary.uploader.upload(req.file.path);

        return res.status(200).json({
            success: true,
            message: "Uploaded!",
            url: result.secure_url,
            data: result,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error uploading image",
        });
    }

}