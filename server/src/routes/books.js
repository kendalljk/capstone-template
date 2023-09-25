import { Router } from "express";
import { Book, User } from "../models/index";

const bookRouter = Router();

bookRouter.post("/", async (req, res, next) => {
    console.log("Received POST request for book");
    const { title, author, cover, category, review, quotes, notes, userId } =
        req.body;

    console.log('req.body', req.body);

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const book = new Book({
        title,
        author,
        cover,
        category,
        review,
        quotes,
        notes,
        userId,
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
        const { userId } = req.query;
        const books = await Book.find({ userId });
        if (books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).send("Cannot find books for the user");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

bookRouter.get("/:title", async (req, res) => {
    try {
        const { title } = req.params;
        const { userId } = req.query;
        const book = await Book.findOne({ title, userId });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).send("Cannot find book");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

bookRouter.put("/:title", async (req, res) => {
    const { title } = req.params;
    const { userId } = req.query;
    const updatedData = req.body;

    try {
        const book = await Book.findOneAndUpdate(
            { title: decodeURIComponent(title), userId },
            updatedData,
            { new: true }
        );
        if (book) {
            res.status(200).json(book);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating the book",
        });
    }
});

bookRouter.delete("/:title", async (req, res) => {
    const { title } = req.params;
    const { userId } = req.query;
    try {
        const book = await Book.findOneAndDelete({
            title: decodeURIComponent(title),
            userId,
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(204).json({ message: "Book successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while deleting the book",
        });
    }
});

export default bookRouter;
