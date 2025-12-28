import express from 'express';
import upload from '../Middleware/upload.js';
import profilePicture from '../Controllers/profilepicture.controller.js';
import cleanup from '../Middleware/cleanup.js';


const router = express.Router();

router.post('/upload', upload.single('image'), cleanup, profilePicture);

export default router;
