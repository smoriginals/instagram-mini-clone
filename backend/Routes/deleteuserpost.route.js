import express from 'express';
import deletePost from '../Controllers/deletepost.controller.js';

const router = express.Router();

router.delete('/:id', deletePost);

export default router;