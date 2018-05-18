import React from 'react';
import PropTypes from 'prop-types';

import ProfileInfo from './ProfileInfo';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import '../css/Container.css';

const ProfileContainer = ({user_info}) =>
  <div className="container contentContainer rounded p-2">
    <div className="container">
      {
        (user_info.is_loading) ?
          <div className="row">
            <div className="loading col-12 d-flex justify-content-center">
              <FontAwesomeIcon icon="spinner" pulse size="7x" className="loadingGif"/>
            </div>
          </div> :
          <div className="profile">
            <ProfileInfo
              user_info={user_info}/>
          </div>
      }
    </div>
  </div>


ProfileContainer.propTypes = {
  user_info: PropTypes.object.isRequired,
}

ProfileContainer.defaultProps = {
  user_info: {},
}

export default ProfileContainer;
