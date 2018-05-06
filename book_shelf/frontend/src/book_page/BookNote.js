import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

const BookNote = ({note}) =>
    <div className="card bg-light mt-4">
      <div className="card-header">
        <b><i className="fas fa-circle-notch mr-1"></i>{note.title}</b>
      </div>
      <div className="card-body">
        <div className="card-content">
          {Parser(note.note_text)}
        </div>
        <p className="card-text text-right">
          <i className="fas fa-heart mr-1"></i>{note.likes_count}
        </p>
      </div>
    </div>

BookNote.propTypes = {
  notes: PropTypes.object.isRequired,
}

BookNote.defaultProps = {
  notes: {},
}

export default BookNote;
