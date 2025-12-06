import express from 'express';
import upload from '../Middleware/upload.js';
import profilePicture from '../Controllers/profilepicture.controller.js';

const router = express.Router();

router.post('/upload', upload.single('image'), profilePicture);

export default router;
