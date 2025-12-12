import express from 'express';
import upload from '../Middleware/upload.js';
import createUserPost from '../Controllers/createuserpost.controller.js';

const router = express.Router();

router.post('/addpost',upload.single('image'),createUserPost);

export default router;