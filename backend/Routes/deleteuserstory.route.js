import express from 'express';
import deleteUserStory from '../Controllers/deleteuserstory.controller.js';
import Auth from '../Middleware/auth.js';

const router = express.Router();
router.delete('/:id',Auth, deleteUserStory);

export default router;