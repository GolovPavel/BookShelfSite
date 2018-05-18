import React from 'react';
import PropTypes from 'prop-types';

import BookInfo from './BookInfo';
import BookNotes from './BookNotes';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import '../css/Container.css';

const BookContainer = ({book, notes, is_loading, onAddNote, onAddLikeToNote, onDeleteLikeFromNote}) =>
  <div className="container contentContainer rounded p-2">
    <div className="container">
      {
        (is_loading) ?
          <div className="row">
            <div className="loading col-12 d-flex justify-content-center">
              <FontAwesomeIcon icon="spinner" pulse size="7x" className="loadingGif"/>
            </div>
          </div> :
          <div className="container">
            <BookInfo book={book} />
            <BookNotes
              notes={notes}
              onAddNote={onAddNote}
              onAddLikeToNote={onAddLikeToNote}
              onDeleteLikeFromNote={onDeleteLikeFromNote} />
          </div>
      }
    </div>
  </div>

BookContainer.propTypes = {
  book: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  is_loading: PropTypes.bool.isRequired,
  onAddNote: PropTypes.func.isRequired,
  onAddLikeToNote: PropTypes.func.isRequired,
  onDeleteLikeFromNote: PropTypes.func.isRequired,
}

BookContainer.defaultProps = {
  book: {},
  notes: [],
  is_loading: false,
  onAddNote: f=>f,
  onAddLikeToNote: f=>f,
  onDeleteLikeFromNote: f=>f,
}

export default BookContainer;
