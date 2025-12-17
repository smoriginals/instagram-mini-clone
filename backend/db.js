import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.CONNECTION_STRING;

export default async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('connected to Mongodb Successfully')
    } catch (error) {
        console.log('MongoDB connection field:', error.message);
        process.exit(1);
    }
}