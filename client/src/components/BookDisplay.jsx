import React from 'react'

const BookDisplay = ({cover, title, author}) => {
  return (
      <div>
          <div className="mx-5">
              <img src={cover} alt={`${title} cover`} height="200" />
              <h4>{title}</h4>
              <h4>{author}</h4>
          </div>
      </div>
  );
}

export default BookDisplay