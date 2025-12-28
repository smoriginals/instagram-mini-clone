import express from 'express'
import fetchUsersPosts from '../Controllers/fetchusersposts.controller.js';
import Auth from '../Middleware/auth.js'
const router = express.Router();

router.get('/getposts',Auth, fetchUsersPosts);

export default router;