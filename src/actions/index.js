
const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  }
};

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  };
};

export const bookAddedToCart = (bookId, count) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: { bookId, count }
  };
};

export const bookRemovedFromCart = (bookId) => {
  return {
    type: 'BOOK_REMOVED_FROM_CART',
    payload: bookId
  };
};

export const allBooksRemovedFromCart = (bookId) => {
  return {
    type: 'ALL_BOOKS_REMOVED_FROM_CART',
    payload: bookId
  };
};

export const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

export const modalOpenned = (bookId) => {
  return {
    type: 'MODAL_OPENNED',
    payload: bookId
  }
}

export const modalClosed = () => {
  return {
    type: 'MODAL_CLOSED',
  }
}

export const bookCountChanged = (count) => {
  return {
    type: 'BOOK_COUNT_CHANGED',
    payload: count
  }
}
