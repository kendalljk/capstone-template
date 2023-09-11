import React, { useState } from "react";

const BookMenu = () => {
    return (
        <div className="py-4">
            <select className="book-menu py-3 px-4 fs-5 fw-normal rounded">
                <option value="" selected>
                    Add to Shelf
                </option>
                <option value="tbr">Want to Read</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
            </select>
        </div>
    );
};

export default BookMenu;
