import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

const BookRating = ({rating}) =>
  <h5>
    <b>Rating: </b>
    {
      _.range(1, 6).map((elem, idx) =>
        (elem <= Math.round(rating)) ?
          <i key={idx} className="fas fa-star"></i> :
          <i key={idx} className="far fa-star"></i>
      )
    }
  </h5>

BookRating.propTypes = {
  notes: PropTypes.number.isRequired,
}

BookRating.defaultProps = {
  notes: 0,
}

export default BookRating;
