import express from "express";
import createUser from '../Controllers/usersignup.controller.js';

const router = express.Router();

router.post("/create", createUser);

export default router;
