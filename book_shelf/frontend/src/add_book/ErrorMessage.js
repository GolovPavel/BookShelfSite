import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ErrorMessage = ({ error }) =>
  <div className="errorMessage">
    <p>
      <FontAwesomeIcon icon="exclamation" /> <b>{error.field}</b>: {error.message}
    </p>
  </div>

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
}

ErrorMessage.defaultProps = {
  error: {},
}

export default ErrorMessage;
