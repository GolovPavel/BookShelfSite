import React from 'react';


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

export default BookNote;
