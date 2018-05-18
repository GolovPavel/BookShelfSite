import React from 'react';
import PropTypes from 'prop-types';

import BookNote from './BookNote';
import AddNoteForm from './AddNoteForm';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const BookNotes = ({notes, onAddNote, onAddLikeToNote, onDeleteLikeFromNote}) =>
  <div className="row">
    <div className="col-12 mt-3 mb-2">
      <h2 className="font-weight-bold text-center"><FontAwesomeIcon icon="sticky-note" className="mr-1"/>Notes</h2>
      <AddNoteForm onAddNote={onAddNote} />
      {
        (notes.length) ?
          notes.map((elem, idx) =>
            <BookNote
              note={elem}
              key={idx}
              onAddLikeToNote={onAddLikeToNote}
              onDeleteLikeFromNote={onDeleteLikeFromNote} />
          ) :
          <div className="alert alert-success mr-1 ml-1 mt-4" role="alert">
            <h5 className="text-center">No notes found <FontAwesomeIcon icon="frown" /></h5>
          </div>
      }
    </div>
  </div>

BookNotes.propTypes = {
  notes: PropTypes.array.isRequired,
  onAddLikeToNote: PropTypes.func.isRequired,
  onDeleteLikeFromNote: PropTypes.func.isRequired,
}

BookNotes.defaultProps = {
  notes: [],
  onAddLikeToNote: f=>f,
  onDeleteLikeFromNote: f=>f,
}


export default BookNotes;
