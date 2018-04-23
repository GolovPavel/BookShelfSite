import React from 'react';
import PropTypes from 'prop-types';

import BookInfo from './BookInfo';
import BookNotes from './BookNotes';

import '../css/Container.css';

const BookContainer = ({book, notes, is_loading}) =>
  <div className="container contentContainer rounded p-2">
    <div className="container">
      {
        (is_loading) ?
          <div className="row">
            <div className="loading col-12 d-flex justify-content-center">
              <i className="loadingGif fas fa-spinner fa-pulse fa-7x"></i>
            </div>
          </div> :
          <div className="container">
            <BookInfo book={book} />
            <BookNotes notes={notes} />
          </div>
      }
    </div>
  </div>

BookContainer.propTypes = {
  book: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  is_loading: PropTypes.bool.isRequired,
}

BookContainer.defaultProps = {
  book: {},
  notes: [],
  is_loading: false,
}

export default BookContainer;
