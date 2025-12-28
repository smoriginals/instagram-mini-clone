import usersignupModel from "../Models/usersignup.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function loginUser(req, res) {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required",
            });
        }

        // 1️⃣ Check if user exists
        const user = await usersignupModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)
       
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        //// 2️⃣ Check password
        //if (user.password !== isMatch) {
        //    return res.status(400).json({
        //        success: false,
        //        message: "Wrong password",
        //    });
        //}
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong password",
            });
        }

        // 3️⃣ Success
        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
