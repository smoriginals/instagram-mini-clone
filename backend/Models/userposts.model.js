import mongoose, { Schema } from "mongoose";

const UserPosts = new Schema({

    title: {
        type:String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "UserSignup",
        required: true,
    },
    image: {
        type: String,
        required: true,
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
            type: Schema.Types.ObjectId,
            ref: "UserSignup",
        }
    ],
    // 👍 multiple comments (referenced from comment model)
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
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
            ref: "Share",
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now,
    }

});

export default mongoose.model("UserPosts", UserPosts);
