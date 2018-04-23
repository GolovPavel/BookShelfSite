import React from 'react';
import PropTypes from 'prop-types';

import BooksList from './BooksList';
import Pagination from './Pagination';
import '../css/Container.css';

const BooksContainer = ({books, num_pages, current_page, is_loading, onChangePage}) =>
  <div className="container contentContainer rounded p-2">
    <div className="container">
      {
        (is_loading) ?
          <div className="row">
            <div className="loading col-12 d-flex justify-content-center">
              <i className="loadingGif fas fa-spinner fa-pulse fa-7x"></i>
            </div>
          </div> :
          <div className="loadedBooks">
            <BooksList books={books} />
            <Pagination
              num_pages={num_pages}
              current_page={current_page}
              onChangePage={onChangePage}/>
          </div>
      }
    </div>
  </div>


BooksContainer.propTypes = {
  books: PropTypes.array.isRequired,
  num_pages: PropTypes.number.isRequired,
  current_page: PropTypes.number.isRequired,
  is_loading: PropTypes.bool.isRequired,
  onChangePage: PropTypes.func.isRequired,
}

BooksContainer.defaultProps = {
  books: [],
  num_pages: 0,
  current_page: 0,
  is_loading: true,
  onChangePage: f=>f,
}

export default BooksContainer;
