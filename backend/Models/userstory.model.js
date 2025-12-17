import mongoose from "mongoose";

const userStory = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSignup",
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        imageId: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            default: () => Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 60 * 24, // 🔥 auto delete after 24h
        },
    },
    { timestamps: true }
);

export default mongoose.model("userStory", userStory);
