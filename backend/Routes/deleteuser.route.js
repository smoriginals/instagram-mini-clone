import express from 'express';

import deleteUser from '../Controllers/deleteuser.controller.js';
import Auth from '../Middleware/auth.js';

const router = express.Router();

router.delete('/deleteuser',Auth, deleteUser);

export default router;