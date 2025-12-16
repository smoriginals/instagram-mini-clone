import express from 'express';
import viewUserStory from '../Controllers/viewuserstory.controller.js';

const router = express.Router();

router.get('/view/:id', viewUserStory);

export default router;