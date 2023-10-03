import { Router } from "express";
import { Book, User } from "../models/index";
import requireAuth from "../middleware/requireAuth";

const bookRouter = Router();

bookRouter.post("/", requireAuth, async (req, res, next) => {
    try {
        const {
            title,
            author,
            cover,
            category,
            review,
            quotes,
            notes,
        } = req.body;
        const { user } = req;

      console.log("user", user)
        console.log("Received POST request for book");
        console.log("req.body", req.body);

        const book = new Book({
            title,
            author,
            cover,
            category,
            review,
            quotes,
            notes,
            user: user._id,
        });
        await book.save();

        user.books.push(book._id);
        await user.save();

        return res.status(201).json(book);
    } catch (error) {
        console.error("Error creating book:", error);
        next(error);
    }
});

bookRouter.get("/", requireAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const books = await Book.find({ user: userId });
        if (books.length > 0) {
            res.status(200).json(books);
        } else {
            res.status(404).send("Cannot find books for the user");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

bookRouter.get("/:title", requireAuth, async (req, res) => {
    try {
        const { title } = req.params;
        const userId = req.user._id;
        const book = await Book.findOne({ title, user: userId });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).send("Cannot find book");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

bookRouter.put("/:title", requireAuth, async (req, res) => {
    const { title } = req.params;
    const userId = req.user._id;
    const updatedData = req.body;

    try {
        const book = await Book.findOneAndUpdate(
            { title: decodeURIComponent(title), user: userId },
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

bookRouter.delete("/:title", requireAuth, async (req, res) => {
    const { title } = req.params;
    const userId = req.user._id;
    try {
        const book = await Book.findOneAndDelete({
            title: decodeURIComponent(title),
            user: userId,
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
