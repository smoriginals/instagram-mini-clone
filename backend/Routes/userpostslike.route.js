import express from 'express';
import addLikes from '../Controllers/addlikes.controller.js';
const router = express.Router();

router.post('/addlike', addLikes);

export default router;