import React from "react";

const ShelfDisplay = ({ cover, title }) => {
    return (
        <div className="d-flex flex-column align-items-center w-100">
            <img
                src={`http://covers.openlibrary.org/b/id/${cover}-L.jpg`}
                alt={`${title} cover`}
                height="200rem"
                width="150rem"
            />
            <div className="w-100 d-block">
                <h4 className="fs-5">{title}</h4>
            </div>
        </div>
    );
};

export default ShelfDisplay;
