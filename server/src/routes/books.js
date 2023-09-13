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

bookRouter.put("/update/:title", async (req, res, next) => {
    const { title } = req.params;
    const { category, update } = req.body;
    try {
        let updatedField = {};

        if (category === "category") {
            updatedField = { category: update };
        } else if (category === "notes") {
            updatedField = { notes: update };
        } else if (category === "quotes") {
            updatedField = { quotes: update };
        } else if (category === "review") {
            updatedField = { review: update };
        } else {
            res.status(400).send("Cannot update category");
            return; // Return early to avoid further execution
        }

        const result = await Book.updateOne(
            { title: title },
            { $set: updatedField }
        );

        if (result.nModified === 0) {
            res.status(404).send("Book not found or no changes made.");
            return;
        }

        const book = await Book.findOne({ title: title });
        res.json(book);
    } catch (error) {
        next(error);
    }
});

export default bookRouter;
