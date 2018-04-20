import React from 'react';

import _ from 'lodash';

const BookNotes = ({rating}) =>
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

export default BookNotes;
