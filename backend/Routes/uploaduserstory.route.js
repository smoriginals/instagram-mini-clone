import express from 'express';
import upload from '../Middleware/upload.js';
import uploadStory from '../Controllers/uploadstory.controller.js';
const router = express.Router();

router.post('/uploadstory', upload.single('image'), uploadStory);

export default router;