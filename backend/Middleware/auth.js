import jwt from 'jsonwebtoken';
import usersignupModel from '../Models/usersignup.model.js';
import dotenv from 'dotenv';
dotenv.config();

export default async function Auth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Not Logged in" })
        }

        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await usersignupModel.findById(decode.id).select('-password');
            
        if(!user){
            return res.status(401).json({message:'User not found'})
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(400).json({ message: 'Token Invalid' });
    }
}