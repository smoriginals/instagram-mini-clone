import express from "express";
import updateUserProfile from '../Controllers/userprofileupdate.controller.js';

const router = express.Router();

router.put("/updateProfile", updateUserProfile);

export default router;