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
        },
        review: {
            type: String,
            minlength: 10,
            maxlength: 300,
        },
        quotes: {
            type: String,
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
