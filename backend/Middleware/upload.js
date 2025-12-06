import multer from 'multer';
import path from 'path';

//import { CloudinaryStorage } from 'multer-storage-cloudinary';
//import cloudinary from './cloudinary.js';


//const storage = new CloudinaryStorage({
//    cloudinary,
//    params: {
//        folder: "profile_pictures",
//        allowed_formats: ["jpg", "png", "jpeg"],
//    },

//})

const storage = multer.diskStorage({
    //destination: function (req, file, cb) {
    //    cb(null,'uploads/')
    //},
    filename: function (req, res, cb) {
        cb(null,Date.now()+path.extname(file.originalname))
    }
});


const upload = multer({ storage });

export default upload;