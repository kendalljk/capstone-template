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
        const { title } = req.params;
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

bookRouter.put("/:title", async (req, res) => {
    const { title } = req.params;
    const updatedData = req.body;

    try {
        const book = await Book.findOneAndUpdate(
            { title: decodeURIComponent(title) },
            updatedData,
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating the book",
        });
    }
});

export default bookRouter;
