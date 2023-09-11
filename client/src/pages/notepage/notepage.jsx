import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../notepage/notepage.css";

const NotePage = () => {
    const location = useLocation();
    const myBook = location.state?.myBook;
    console.log("My Book", myBook);

    return (
        <section className="display note-page d-flex flex-md-row flex-sm-column justify-content-center w-75 mx-auto mt-5">
            <div className="col-md-6 col-12 d-flex justify-content-center">
                <img
                    className="note-cover w-auto"
                    src={`http://covers.openlibrary.org/b/id/${myBook.cover}-L.jpg`}
                    alt={`${myBook.title} cover`}
                />
            </div>
            <div className="col-md-6 col-12">
                <h2 className="fst-italic">{myBook.title}</h2>
                <p className="fs-4 fw-medium">by {myBook.author}</p>
                <div className="d-flex flex-column">
                    <label htmlFor="book-review" className="fs-4 fw-medium">
                        review:
                    </label>
                    <textarea
                        className="rounded border-0 p-2"
                        name="book-review"
                        id="book-review"
                        rows="3"
                    ></textarea>
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="book-quotes" className="fs-4 fw-medium">
                        quotes:
                    </label>
                    <textarea
                        className="rounded border-0 p-2"
                        name="book-quotes"
                        id="book-quotes"
                        rows="5"
                    ></textarea>
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="book-notes" className="fs-4 fw-medium">
                        quotes:
                    </label>
                    <textarea
                        className="rounded border-0 p-2"
                        name="book-notes"
                        id="book-note"
                        rows="5"
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-5">
                    <button className="note-button">save</button>
                </div>
            </div>
        </section>
    );
};

export default NotePage;
