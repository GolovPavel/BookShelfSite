import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import _ from 'lodash';

const BookRating = ({rating}) =>
  <h5>
    <b>Rating: </b>
    {
      _.range(1, 6).map((elem, idx) =>
        (elem <= Math.round(rating)) ?
          <FontAwesomeIcon icon="star" key={idx}/> :
          <FontAwesomeIcon icon={["far", "star"]} key={idx} />
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
