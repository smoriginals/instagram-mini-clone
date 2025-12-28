import express from 'express';
import addLikes from '../Controllers/addlikes.controller.js';
import Auth from '..//Middleware/auth.js';

const router = express.Router();
router.post('/:id/like',Auth, addLikes);

export default router;