import React from 'react';
import './book-list-item.css';

const BookListItem = ({ book, onModalOpenned }) => {
  const { title, price, image } = book;
  return (
    <div className="book-list-item">
      <div className="book-cover">
        <img src={image} alt="cover" />
      </div>
      <div className="book-details">
        <span className="book-title">{title}</span>
        <div className="book-price">${price}</div>
        <button
          onClick={onModalOpenned}
          className="btn btn-info add-to-cart">
          Купить
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
