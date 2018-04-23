import React from 'react';
import PropTypes from 'prop-types';


const BookNote = ({note}) =>
  <div className="card bg-light mt-4">
    <div className="card-header">
      <b><i className="fas fa-circle-notch mr-1"></i>{note.title}</b>
    </div>
    <div className="card-body">
      <p className="card-text">{note.note_text}</p>
      <p className="card-text text-right"><i className="fas fa-heart mr-1"></i>{note.likes_count}</p>
    </div>
  </div>

BookNote.propTypes = {
  notes: PropTypes.object.isRequired,
}

BookNote.defaultProps = {
  notes: {},
}

export default BookNote;
