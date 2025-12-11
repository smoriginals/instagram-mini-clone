import express from 'express';
import CreatingPost from '../Controllers/creatingpost.controller.js';

const router = express.Router();

router.post('/create', CreatingPost);

export default router;