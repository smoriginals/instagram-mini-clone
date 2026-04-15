import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

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