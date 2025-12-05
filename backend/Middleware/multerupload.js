import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profile_pictures',
        allowed_formate: ['jpg', 'jpeg', 'png']
    },

})

const multerupload = multer({ storage });

export default multerupload;