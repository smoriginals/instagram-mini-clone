import express from 'express';
import searchUsers from '../Controllers/searchusers.controller.js';
import Auth from '../Middleware/auth.js';
const router = express.Router();

router.get('/search',Auth, searchUsers);

export default router;