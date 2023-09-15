import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../bookInfo/bookInfo.css";

const BookInfo = () => {
    const { title } = useParams();
    const [book, setBook] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const encodedTitle = encodeURIComponent(title);
                const response = await axios.get(
                    `http://localhost:3001/api/books/${encodedTitle}`
                );
                setBook(response.data);
            } catch (error) {
                console.error("An error occurred while fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = async () => {
        if (isEditing) {
            try {
                await axios.put(
                    `http://localhost:3001/api/books/${title}`,
                    book
                );
                alert("Success!");
            } catch (error) {
                console.error("An error occurred while updating data: ", error);
            }
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
        console.log("Updated Book:", book);
    };

    return (
        <section className="display note-page d-flex flex-md-row flex-sm-column justify-content-center w-75 mx-auto mt-5">
            <div className="col-md-6 col-12 d-flex justify-content-center">
                <img
                    className="note-cover w-auto"
                    src={`http://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
                    alt={`${book.title} cover`}
                />
            </div>
            <form className="col-md-6 col-12">
                <h2 className="fst-italic">{book.title}</h2>
                <p className="fs-4 fw-medium">by {book.author}</p>
                <div className="d-flex flex-column">
                    <label htmlFor="review" className="fs-4 fw-medium">
                        review:
                    </label>
                    <textarea
                        value={book.review}
                        onChange={handleChange}
                        className="rounded border-0 p-2"
                        name="review"
                        id="review"
                        rows="3"
                        readOnly={!isEditing}
                    ></textarea>
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="quotes" className="fs-4 fw-medium">
                        quotes:
                    </label>
                    <textarea
                        value={book.quotes}
                        onChange={handleChange}
                        className="rounded border-0 p-2"
                        name="quotes"
                        id="quotes"
                        rows="5"
                        readOnly={!isEditing}
                    ></textarea>
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="notes" className="fs-4 fw-medium">
                        notes:
                    </label>
                    <textarea
                        value={book.notes}
                        onChange={handleChange}
                        className="rounded border-0 p-2"
                        name="notes"
                        id="notes"
                        rows="5"
                        readOnly={!isEditing}
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-5">
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="note-button"
                    >
                        {isEditing ? "update" : "edit"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default BookInfo;
