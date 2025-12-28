import express from 'express';
import upload from '../Middleware/upload.js';
import createUserPost from '../Controllers/createuserpost.controller.js';
import Auth from '../Middleware/auth.js';

const router = express.Router();

router.post('/addpost',Auth,upload.single('image'),createUserPost);

export default router;