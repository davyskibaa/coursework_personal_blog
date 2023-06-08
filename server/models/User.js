import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        role: {
            type: Number,
            default: 2,
        }
    },
    { timestamps: true },
)

export default mongoose.model('User', UserSchema)