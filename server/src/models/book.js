import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        author: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
        },
        cover: {
            required: true,
            type: String,
        },
        category: {
            required: true,
            type: String,
            enum: ["reading", "read", "tbr"],
        },
        review: {
            type: String,
        },
        quotes: {
            type: String,
        },
        notes: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
