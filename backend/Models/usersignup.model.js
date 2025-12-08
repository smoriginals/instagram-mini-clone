import mongoose, { Schema } from 'mongoose';

const UserSignup = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    gender: {
        type: String
    },
    website: {
        type: String
    },
    businessEmail: {
        type: String
    },
    userProfile: {
        type: String
    },
    userProfileId: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('UserSignup', UserSignup);