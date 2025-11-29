import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const mongoURI = process.env.CONNECTION_STRING;

async function connectDB () {

    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.log('Connection Feiled :', error);
    }
};

export default connectDB;
