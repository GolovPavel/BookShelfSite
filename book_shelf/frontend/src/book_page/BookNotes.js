import React from 'react';
import PropTypes from 'prop-types';

import BookNote from './BookNote';

const BookNotes = ({notes}) =>
  <div className="row">
    <div className="col-12 mt-3 mb-2">
      <h2 className="font-weight-bold text-center"><i className="far fa-sticky-note mr-1"></i>Notes</h2>
      {
        (notes.length) ?
          notes.map((elem, idx) =>
            <BookNote note={elem} key={idx} />
          ) :
          <div className="alert alert-success mr-1 ml-1 mt-4" role="alert">
            <h5 className="text-center">No notes found <i className="far fa-frown"></i></h5>
          </div>
      }
    </div>
  </div>

BookNotes.propTypes = {
  notes: PropTypes.array.isRequired,
}

BookNotes.defaultProps = {
  notes: [],
}


export default BookNotes;
