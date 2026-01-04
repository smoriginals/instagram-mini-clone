import express from 'express';
import  sendUserReport from '../Controllers/senduserreport.controller.js';

const router = express.Router();

router.post('/report', sendUserReport);

export default router;