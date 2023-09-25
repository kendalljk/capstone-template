import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).send(error);
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .send({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res
                .status(400)
                .send({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY", {
            expiresIn: "1d",
        });
        res.status(200).send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
});

export default userRouter;
