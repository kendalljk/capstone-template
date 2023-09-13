import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShelfDisplay = ({ book }) => {
    const navigate = useNavigate();
    const [myBook, setMyBook] = useState(book);
    console.log("Book", book);

  const directToNote = () => {
      const { category, title } = book;
        if (category === "tbr" || category === "reading") {
            navigate(`/note/${book.title}`, { state: { myBook } });
        } else if (category === "read") {
            navigate(`/book/${book.title}`);
        } else {
            alert("Error");
        }
    };

    return (
        <div
            onClick={directToNote}
            className="d-flex flex-column align-items-center w-100"
        >
            <img
                src={`http://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
                alt={`${book.title} cover`}
                height="200rem"
                width="150rem"
            />
            <div className="w-100 d-block">
                <h4 className="fs-5">{book.title}</h4>
            </div>
        </div>
    );
};

export default ShelfDisplay;
