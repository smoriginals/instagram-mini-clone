import express from 'express';
import viewUserStory from '../Controllers/viewuserstory.controller.js';
import Auth from '../Middleware/auth.js';

const router = express.Router();

router.get('/view/:id',Auth, viewUserStory);

export default router;