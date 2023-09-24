import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        displayName: {
            type: String,
            maxlength: 50,
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Book",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
