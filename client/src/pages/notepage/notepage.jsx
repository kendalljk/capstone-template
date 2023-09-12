import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../notepage/notepage.css";

const NotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const myBook = location.state?.myBook;
    const [myNote, setMyNote] = useState({ ...myBook });
    console.log("My Note", myNote);

    const addToNote = (event) => {
        const { name, value } = event.target;
        setMyNote((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const saveNote = async (event) => {
        event.preventDefault();
        try {
            console.log(myNote);
            const response = await axios.post(
                "http://localhost:3001/api/books",
                myNote
            );

            if (response.status === 201) {
                console.log("Book successfully saved to MongoDB.");
            } else {
                console.log("Failed to save the book.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
      }
      navigate('/shelf')
    };

    return (
        <section className="display note-page d-flex flex-md-row flex-sm-column justify-content-center w-75 mx-auto mt-5">
            <div className="col-md-6 col-12 d-flex justify-content-center">
                <img
                    className="note-cover w-auto"
                    src={`http://covers.openlibrary.org/b/id/${myBook.cover}-L.jpg`}
                    alt={`${myBook.title} cover`}
                />
            </div>
            <form onSubmit={saveNote} className="col-md-6 col-12">
                <h2 className="fst-italic">{myBook.title}</h2>
                <p className="fs-4 fw-medium">by {myBook.author}</p>
                <div className="d-flex flex-column">
                    <label htmlFor="review" className="fs-4 fw-medium">
                        review:
                    </label>
                    <textarea
                        value={myNote.review}
                        onChange={addToNote}
                        className="rounded border-0 p-2"
                        name="review"
                        id="review"
                        rows="3"
                    ></textarea>
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="quotes" className="fs-4 fw-medium">
                        quotes:
                    </label>
                    <textarea
                        value={myNote.quotes}
                        onChange={addToNote}
                        className="rounded border-0 p-2"
                        name="quotes"
                        id="quotes"
                        rows="5"
                    ></textarea>
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="notes" className="fs-4 fw-medium">
                        notes:
                    </label>
                    <textarea
                        value={myNote.notes}
                        onChange={addToNote}
                        className="rounded border-0 p-2"
                        name="notes"
                        id="notes"
                        rows="5"
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-5">
                    <button type="submit" className="note-button">
                        save
                    </button>
                </div>
            </form>
        </section>
    );
};

export default NotePage;
