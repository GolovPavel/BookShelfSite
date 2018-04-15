import React from 'react';

import './css/Book.css';

const Book = ({ title, rating, id , picture}) =>
  <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-3">
      <a href={`/books/${id}/`}>
        <img className="bookImg rounded" src={picture} title={title} alt={title} />
      </a>
  </div>

export default Book;
