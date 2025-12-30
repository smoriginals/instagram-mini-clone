import express from 'express';
import userFollow from '../Controllers/userfollow.controller.js';
import Auth from '../Middleware/auth.js';
const router = express.Router();

router.put('/:id',Auth, userFollow);

export default router;