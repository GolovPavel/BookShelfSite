import React from 'react';
import PropTypes from 'prop-types';

import AddBookForm from './AddBookForm';
import ErrorMessage from './ErrorMessage';

import '../css/Container.css';

const BookAddContainer = ({ onAddBook, isSuccess, isError, errorMessages }) =>
  <div className="container contentContainer rounded p-2">
    <div className="container">
      <div className="heading text-center">
        <h1><i className="fas fa-plus"></i> Add new book</h1>
      </div>
      <div className="alert alert-success successMessage" style={{display: isSuccess ? 'block' : 'none' }} role="alert">
        The book was added successfully!
      </div>
      <div className="alert alert-danger" style={{display: isError ? 'block' : 'none' }} role="alert">
        {errorMessages.map((error, idx) =>
          <ErrorMessage key={idx} error={error} />
        )}
      </div>
      <AddBookForm onAddBook={onAddBook} />
    </div>
  </div>

BookAddContainer.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
}

BookAddContainer.defaultProps = {
  onAddBook: f=>f,
  isSuccess: false,
  isError: false,
  errorMessages: [],
}

export default BookAddContainer;
