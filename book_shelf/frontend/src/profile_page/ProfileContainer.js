import React from 'react';

import ProfileInfo from './ProfileInfo';

import '../css/Container.css';

const ProfileContainer = ({user_info}) =>
  <div className="container contentContainer rounded p-2">
    <div className="container">
      {
        (user_info.is_loading) ?
          <div className="row">
            <div className="loading col-12 d-flex justify-content-center">
              <i className="loadingGif fas fa-spinner fa-pulse fa-7x"></i>
            </div>
          </div> :
          <div className="profile">
            <ProfileInfo
              user_info={user_info}/>
          </div>
      }
    </div>
  </div>

export default ProfileContainer;
