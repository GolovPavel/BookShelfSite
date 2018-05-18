import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ProfileInfo = ({user_info}) =>
  <div className="container">
    <div className="row mr-1 mt-2">
      <div className="col-xs-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center">
        <img src="/static/accounts/img/default-avatar.png" alt="avatar" />
      </div>
      <div className="col-xs-12 col-md-12 col-lg-6 col-xl-6 mt-2">
        <h3 className="font-weight-bold mt-2 mb-4"><FontAwesomeIcon icon="user-circle" /><b> Profile</b></h3>
        <h5><b><FontAwesomeIcon icon="user" /> Username:</b> {user_info.username}</h5>
        <h5><b><FontAwesomeIcon icon="at" /> Email:</b> {user_info.email}</h5>
        <h5><b><FontAwesomeIcon icon="book" /> Books count:</b> {user_info.books_count}</h5>
        <h5><b><FontAwesomeIcon icon="sticky-note" /> Notes count:</b> {user_info.notes_count}</h5>
      </div>
    </div>
  </div>

ProfileInfo.propTypes = {
  user_info: PropTypes.object.isRequired,
}

ProfileInfo.defaultProps = {
  user_info: {},
}

export default ProfileInfo;
