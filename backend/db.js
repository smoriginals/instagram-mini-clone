import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://surajmauryahomework_db_user:iXIS7nOys0zN8i1o@instagramclusters.nngrbdx.mongodb.net/";

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
