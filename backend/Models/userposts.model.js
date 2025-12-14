import mongoose, { Schema } from "mongoose";

const UserPosts = new Schema({

    title: {
        type:String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSignup",
        required: true,
    },
    image: {
        type: String,
    },
    imageId: {
        type: String, // cloudinary ID or any storage ID
    },
    caption: {
        type: String,
        trim: true,
    },
    // 👍 multiple likes from different users
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSignup",
        }
    ],
    // 👍 multiple comments (referenced from comment model)
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserSignup",
                required: true
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    // 👍 multiple users can save this post
    savedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "UserSignup",
        }
    ],
    // optional shares
    shares: [
        {
            type: Schema.Types.ObjectId,
            ref: "UserSignup",
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now,
    }

});

export default mongoose.model("UserPosts", UserPosts);
