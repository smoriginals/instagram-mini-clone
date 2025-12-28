import express from 'express';
import upload from '../Middleware/upload.js';
import uploadStory from '../Controllers/uploadstory.controller.js';
import Auth from '../Middleware/auth.js';
const router = express.Router();

router.post('/uploadstory',Auth, upload.single('image'), uploadStory);

export default router;