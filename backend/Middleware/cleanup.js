import fs from 'fs';

export default function cleanup(req, res, next) {
    res.on('finish', () => {
        if (req.file?.path) {
            try {
                fs.unlinkSync(req.file.path);
            }
            catch (err) {
                return res.status(400).json({message:"File Unlinking Feiled:",err:err.message})
            }
        }

        if (req.files) {
            Object.values(req.files).flat().forEach(file => {
                try {
                    fs.unlinkSync(file.path)
                }
                catch (err) {
                    return res.status(400).json({ message: "MultiFile Unlinking Feiled:", err: err.message })
                }
            })
        }
    })
    next();
}