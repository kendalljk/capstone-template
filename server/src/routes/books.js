import { Router } from "express";
import Book from "../models/book";

const bookRouter = Router();

bookRouter.post("/", async (req, res, next) => {
    console.log("Received POST request for book");
    const { title, author, cover, category, review, quotes, notes } = req.body;

    console.log(title);

    const book = new Book({
        title,
        author,
        cover,
        category,
        review,
        quotes,
        notes,
    });
    try {
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

bookRouter.get("/", async (req, res) => {
    try {
        const book = await Book.find();
        if (book) {
            res.json(book);
        } else {
            res.status(404).send("Cannot find book");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

bookRouter.get("/:title", async (req, res) => {
    try {
        const book = await Book.findOne({ title });
        if (book) {
            res.json(book);
        } else {
            res.status(404).send("Cannot find book");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default bookRouter;
