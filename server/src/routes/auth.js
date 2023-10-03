import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import key from "../config/app.config";


const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "please add all the fields" });
        }

        const savedUser = await User.findOne({ email: email });

        if (savedUser) {
            return res
                .status(422)
                .json({ error: "user already exists with that email" });
        }

        const hashedpassword = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            password: hashedpassword,
        });

        await user.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "missing username or password" });
    }
    try {
        console.log("Received login request:", req.body);
        const user = await User.findOne({ email: email });

        const passwordCorrect =
            user === null
                ? false
                : await bcrypt.compare(password, user.password);

        if (!(user && passwordCorrect)) {
            return res.status(401).json({
                error: "invalid username or password",
            });
        }

        const token = jwt.sign({ email: user.email, userId: user._id }, key.jwt.secret, { expiresIn: '1d' });

        res.status(200).send({
            token, email: user.email, uid: user.id
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(400).send(error);
    }
});

export default authRouter;
