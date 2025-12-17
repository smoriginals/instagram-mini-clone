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
        
    },
    { timestamps: true }
);

export default mongoose.model("userStory", userStory);
