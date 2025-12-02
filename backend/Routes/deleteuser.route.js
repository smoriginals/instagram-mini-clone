import express from 'express';

import deleteUser from '../Controllers/deleteuser.controller.js';

const router = express.Router();

router.delete('/deleteuser', deleteUser);

export default router;