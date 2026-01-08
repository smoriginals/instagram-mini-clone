import express from 'express';
import upload from '../Middleware/upload.js';
import uploadStory from '../Controllers/uploadstory.controller.js';
import Auth from '../Middleware/auth.js';
const router = express.Router();

router.post('/uploadstory', upload.single('image'), Auth, uploadStory);

export default router;