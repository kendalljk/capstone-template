import React from "react";
import '../landing/landing.css'
import bookImage from "../../images/bookImage.png"
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const directToSearch = (e) => {
    e.preventDefault();
    navigate(`/search`)
  }

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
                <h1 className="app-name display-4 display-xs-6 display-sm-5 display-md-3 display-lg-2">
                    SHELF HELP
                </h1>
                <h4 className="tag-line">
                    What you've read, what you want to read, all in one place.
                </h4>
                <div className="button-container">
                    <button onClick={directToSearch} className="landing-button">
                        search books
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Landing;
