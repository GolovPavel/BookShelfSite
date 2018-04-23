import React from 'react';
import PropTypes from 'prop-types';


const BooksRow = ({ chunk }) =>
  <div className="row">
    {chunk}
  </div>

BooksRow.propTypes = {
  chunk: PropTypes.array.isRequired,
}

BooksRow.defaultProps = {
  chunk: [],
}

export default BooksRow;
