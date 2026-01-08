import multer from 'multer';
//import path from 'path';

let upload;

//if (process.env.NODE_ENV === 'production') {
//    upload = multer({
//        storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 },
//    })
//}
 upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
});

//} else {
//    const storage = multer.diskStorage({
//        destination: (req, file, cb) => {
//            cb(null, 'uploads/'); // or desired path
//        },
//        filename: (req, file, cb) => {
//            cb(null, Date.now() + path.extname(file.originalname));
//        }
//    });
//    upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
//}


//const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//        cb(null, 'uploads/'); // or desired path
//    },
//    filename: (req, file, cb) => {
//        cb(null, Date.now() + path.extname(file.originalname));
//    }
//});

//const upload = multer({ storage });
export default upload;
