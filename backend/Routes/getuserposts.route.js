import express from 'express'
import fetchUsersPosts from '../Controllers/fetchusersposts.controller.js';

const router = express.Router();

router.get('/getposts', fetchUsersPosts);

export default router;