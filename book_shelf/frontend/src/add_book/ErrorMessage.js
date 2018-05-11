import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) =>
  <div className="errorMessage">
    <p>
      <i className="fas fa-exclamation"></i> <b>{error.field}</b>: {error.message}
    </p>
  </div>

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
}

ErrorMessage.defaultProps = {
  error: {},
}

export default ErrorMessage;
