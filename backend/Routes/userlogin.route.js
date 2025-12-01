import express from "express";
import loginUser from '../Controllers/userlogin.controller.js';

const router = express.Router();

router.post("/login", loginUser);

export default router;
