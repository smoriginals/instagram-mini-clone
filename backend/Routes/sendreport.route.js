import express from 'express';
import sendUserReport from '../Controllers/senduserreport.controller.js';
import Auth from '../Middleware/auth.js';
const router = express.Router();

router.post('/report', Auth, sendUserReport);

export default router;