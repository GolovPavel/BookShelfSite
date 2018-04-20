import React from 'react';

const ProfileInfo = ({user_info}) =>
  <div className="container">
    <div className="row mr-1 mt-2">
      <div className="col-xs-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center">
        <img src="/static/accounts/img/default-avatar.png" alt="avatar" />
      </div>
      <div className="col-xs-12 col-md-12 col-lg-6 col-xl-6 mt-2">
        <h3 className="font-weight-bold mt-2 mb-4"><i className="fas fa-user-circle"></i><b> Profile</b></h3>
        <h5><b><i className="fas fa-user"></i> Username:</b> {user_info.username}</h5>
        <h5><b><i className="fas fa-at"></i> Email:</b> {user_info.email}</h5>
        <h5><b><i className="fas fa-book"></i> Books count:</b> {user_info.books_count}</h5>
        <h5><b><i className="fas fa-sticky-note"></i> Notes count:</b> {user_info.notes_count}</h5>
      </div>
    </div>
  </div>

export default ProfileInfo;
