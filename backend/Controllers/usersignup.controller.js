import usersignupModel from "../Models/usersignup.model.js";
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const signupSchema = Joi.object({

    email: Joi.string().email().required(),
    name: Joi.string().min(4).max(28).required(),
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(8).required(),

})


export default async function createUser(req, res) {

    try {

        const { error, value } = signupSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message||'Data Validation Failed!',
            });
        }

        const { email, name, username, password } = value;

        const existingUser = await usersignupModel.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email or Username already exists" });
        }

        const hashing = await bcrypt.hash(password, 10);

        const newUser = new usersignupModel({
            email:email.toLowerCase(),
            name,
            username: username.toLowerCase(),
            password: hashing,
        });

        await newUser.save();
       
        res.status(201).json({
            success: true,
            user: {
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                username: newUser.username,
                createdAt: newUser.createdAt,
            },
            //newUser
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}