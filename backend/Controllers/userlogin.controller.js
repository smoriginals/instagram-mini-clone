import usersignupModel from "../Models/usersignup.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi'


const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
})


export default async function loginUser(req, res) {

    const { error } = loginSchema.validate(req.body, {
        abortEarly: true,//stop on first error
    })
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    const { email, password } = req.body;

    try {

        // 1️ Check if user exists
        const user = await usersignupModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // 2 Give user token and check hashed pass
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong password",
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        // 3️ Success
        res.status(200).json({
            success: true,
            message: "Login successful",
            //user, <-- this returns user password as well so we filter this 
            //token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                role: user.role || "user",
            },
            token,
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
