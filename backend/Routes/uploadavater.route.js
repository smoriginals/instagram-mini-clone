import express from 'express';
import uploadavaterController from '../Controllers/uploadavater.controller.js';
import multer from 'multer';

const upload = multer({dest:"/uploads"})
const router = express.Router();

router.post('/upload-picture', upload.single('avater') ,uploadavaterController);

export default router;