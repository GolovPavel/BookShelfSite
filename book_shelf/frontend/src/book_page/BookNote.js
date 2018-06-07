import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import '../css/book_page/BookNote.css';

const BookNote = ({note, onAddLikeToNote, onDeleteLikeFromNote}) =>
    <div className="card bg-light mt-4">
      <div className="card-header">
        <b><FontAwesomeIcon icon="circle-notch" className="mr-1"/>{note.title}</b>
      </div>
      <div className="card-body">
        <div className="card-content">
          {Parser(note.note_text)}
        </div>
        <div className="card-text text-right">
          {
            (note.liked !== 0) ?
              <div onClick={() => onDeleteLikeFromNote(note.id)} className="d-inline-block">
                <FontAwesomeIcon icon="heart" className="hov"/>
              </div> :
              <div onClick={() => onAddLikeToNote(note.id)} className="d-inline-block">
                <FontAwesomeIcon icon={['far', 'heart']} className="hov"/>
              </div>
          }
          <span className="ml-2">{note.likes_count}</span>
        </div>
      </div>
    </div>

BookNote.propTypes = {
  notes: PropTypes.object.isRequired,
  onAddLikeToNote: PropTypes.func.isRequired,
  onDeleteLikeFromNote: PropTypes.func.isRequired,
}

BookNote.defaultProps = {
  notes: {},
  onAddLikeToNote: f=>f,
  onDeleteLikeFromNote: f=>f,
}

export default BookNote;
