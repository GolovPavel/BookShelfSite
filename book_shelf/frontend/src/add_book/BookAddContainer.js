import React from 'react';
import PropTypes from 'prop-types';

import AddBookForm from './AddBookForm';

import '../css/Container.css';

const BookAddContainer = ({ onAddBook }) =>
  <div className="container contentContainer rounded p-2">
    <div className="container">
      <div className="heading text-center">
        <h1><i className="fas fa-plus"></i> Add new book</h1>
      </div>
      <AddBookForm onAddBook={onAddBook} />
    </div>
  </div>

BookAddContainer.propTypes = {
  onAddBook: PropTypes.func.isRequired,
}

BookAddContainer.defaultProps = {
  onAddBook: f=>f,
}

export default BookAddContainer;
