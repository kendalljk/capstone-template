import React from "react";
import bookImage from "../images/bookImage.png"

const Landing = () => {
    return (
        <section className="landing-page">
            <div className="image-container">
                <img
                    src={bookImage}
                    alt="hand holding a stack of books"
                    className="homepage-image"
                />
            </div>
            <div className="details-display">
                <h2 className="app-name">SHELF HELP</h2>
                <h4 className="tag-line">
                    What you've read, what you want to read, all in one place.
                </h4>
                <div className="button-container">
                    <button className="search-button">search books</button>
                </div>
            </div>
        </section>
    );
};

export default Landing;
