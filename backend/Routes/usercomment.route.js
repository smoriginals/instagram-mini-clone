import express from 'express';
import userComments from '../Controllers/usercomments.controller.js';
const router = express.Router();

router.post('/:id/comments', userComments);

export default router;