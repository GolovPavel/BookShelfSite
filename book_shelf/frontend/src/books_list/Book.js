import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import '../css/book_list/Book.css';

const Book = ({ title, rating, id , picture}) =>
  <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-3">

      <Link to={`/books/${id}/`}>
        <img className="bookImg rounded" src={`/media/${picture}`} title={title} alt={title} />
      </Link>
  </div>

Book.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
}

Book.defaultProps = {
  title: "",
  rating: 0,
  id: 0,
  picture: "",
}

export default Book;
