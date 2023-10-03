import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShelfDisplay from "../../components/ShelfDisplay";
import "../bookshelf/shelf.css";
import { UserContext } from "../../App";

const Shelf = () => {
    const { user } = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    console.log("shelf user", user);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(
                    `http://localhost:3001/api/books`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBooks(response.data);
            } catch (error) {
                console.error("An error occurred while fetching data: ", error);
            }
        };

        fetchData();
    }, [user]);

    const readingBooks = books.filter((book) => book.category === "reading");
    const readBooks = books.filter((book) => book.category === "read");

    return (
        <section className="display bookShelf">
            <div className="d-flex flex-column">
                <h2 className="shelf-heading mt-5 mx-5 fst-italic fw-normal">
                    Currently reading...
                </h2>
                <div className="reading mt-2 d-flex flex-wrap">
                    {readingBooks.map((book, i) => (
                        <div
                            key={i}
                            className="text-center d-flex  flex-column align-items-center col-sm-2 col-lg-1 mx-5 mt-3"
                        >
                            <ShelfDisplay book={book} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="read mt-2">
                <h2 className="shelf-heading mt-5 mx-5 fst-italic fw-normal">
                    On the shelf...
                </h2>
                <div className="reading mt-2 d-flex flex-wrap">
                    {readBooks.map((book, i) => (
                        <div
                            key={i}
                            className="text-center d-flex  flex-column align-items-center col-sm-2 col-lg-1 mx-5 mt-3"
                        >
                            <ShelfDisplay book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Shelf;
