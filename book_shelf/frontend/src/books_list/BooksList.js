import React from 'react';

import _ from 'lodash';

import Book from './Book';
import BooksRow from './BooksRow';

import '../css/book_list/BooksList.css';

const BooksList = ({ books }) => {
    if (books.length === 0) {
      return <div className="row">
          <div className="booksNotFound col-12 d-flex justify-content-center">
            <h2 className="font-weight-bold">No books found</h2>
          </div>
        </div>
    } else {
      const chunked_books = _.chunk(books.map((book) =>
          <Book key={book.id} {...book} />
        ), 3);

      return chunked_books.map((chunk, idx) =>
        <BooksRow key={idx} chunk={chunk} />
      );
    }
}

export default BooksList;
