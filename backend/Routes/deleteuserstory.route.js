import express from 'express';
import deleteUserStory from '../Controllers/deleteuserstory.controller.js';
const router = express.Router();

router.delete('/:id', deleteUserStory);

export default router;