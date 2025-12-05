import express from 'express';
import multerupload from '../Middleware/multerupload.js';
import profilepictureController from '../Controllers/profilepicture.controller.js';


const router = express.Router();

router.post('/upload-picture', multerupload.single('profilepicture'), profilepictureController);

export default router;