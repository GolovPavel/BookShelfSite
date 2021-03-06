import React from 'react';
import PropTypes from 'prop-types';

import BookRating from './BookRating';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import '../css/book_page/book_info.css';


const BookInfo = ({book}) =>
    <div className = "bookInfo">
      <div className="row mr-1">
        <div className="col-xs-12 col-md-12 col-lg-5 col-xl-5 d-flex justify-content-center">
          <img className="bookInfoImg rounded" alt="book_picture" src={`/media/${book.picture}`} />
        </div>
        <div className=" bookInf rounded col-xs-12 col-md-12 col-lg-7 col-xl-7 mt-2">
          <h3 className="font-weight-bold mt-2 mb-4"><FontAwesomeIcon icon="book" className="mr-2" /><b>Book desctiption</b></h3>
          <h5><b>Title:</b> {book.title}</h5>
          <BookRating rating={book.rating} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 mt-3">
          <h5 className="text-justify">{book.description}</h5>
        </div>
      </div>
    </div>

BookInfo.propTypes = {
  book: PropTypes.object.isRequired,
}

BookInfo.defaultProps = {
  book: {},
}


export default BookInfo;
