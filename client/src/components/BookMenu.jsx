import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookMenu = ({ book }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [displayValue, setDisplayValue] = useState("Update Status");

    useEffect(() => {
        if (location.pathname.startsWith("/search/")) {
            setDisplayValue("Add to Shelf");
        } else {
            setDisplayValue("Update Status");
        }
    }, [location.pathname]);

    const handleCategoryChange = async (e) => {
        const newCategory = e.target.value;
        let newBook = {
            author: book.author,
            title: book.title,
            cover: book.coverI,
            category: newCategory,
        };

        try {
            const response = await axios.get(
                `http://localhost:3001/api/books/${book.title}`
            );

            if (response.status === 200) {
                await axios.put(
                    `http://localhost:3001/api/books/${book.title}`,
                    {
                        category: newCategory,
                    }
                );
                console.log("Book updated successfully.");
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                const response = await axios.post(
                    "http://localhost:3001/api/books",
                    newBook
                );
                if (response.status === 201) {
                    console.log("Book successfully saved to MongoDB.");
                }
            } else {
                console.error("An error occurred:", error);
            }
        }

        if (newCategory === "read") {
            navigate(`/note/${book.title}`, { state: { book: newBook } });
        } else if (newCategory === "reading") {
            navigate("/shelf");
        } else if (newCategory === "tbr") {
            navigate("/tbr");
        }
    };

    return (
        <div className="">
            <select
                className="book-menu px-4 fs-5 fw-normal rounded"
                value={book.category}
                onChange={handleCategoryChange}
            >
                <option value="" disabled selected>
                    {displayValue}
                </option>
                <option value="tbr">Want to Read</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
            </select>
        </div>
    );
};

export default BookMenu;
