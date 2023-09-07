import React from "react";
import BookDisplay from "../../components/BookDisplay";
import '../bookshelf/shelf.css'
import cover from '../../images/cover.png'

const Shelf = () => {
  return (
      <section className="bookShelf">
          <div className="reading">
              <h2 className="shelf-heading">Currently reading...</h2>
              <BookDisplay
                  title={"Harry Potter"}
                  author={"JK Rowling"}
                  cover={cover}
              />
          </div>
          <div className="read">
              <h2 className="shelf-heading">On the shelf...</h2>
              <BookDisplay />
          </div>
      </section>
  );
};

export default Shelf;
