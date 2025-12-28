import express from 'express';
import allUsers from '../Controllers/allusers.controller.js';
const router = express.Router();

router.get('/users', allUsers);

export default router;