import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authenticateJWT from "../middleware/authenticateJWT";

const userRouter = express.Router();

userRouter.get("/status", authenticateJWT, (req, res) => {
    console.log("Received token:", req.headers.authorization);
    if (req.userId) {
        console.log("Token is valid for user:", req.userId);
        res.status(200).send({ loggedIn: true, userId: req.userId });
    } else {
        console.log("Token is invalid or not provided");
        res.status(401).send({ loggedIn: false });
    }
});

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
  const JWT_SECRET = process.env.JWT_SECRET

    try {
        console.log("Received login request:", req.body);
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
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).send({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(400).send(error);
    }
});

export default userRouter;
