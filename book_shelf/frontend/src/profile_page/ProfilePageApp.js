import React, { Component } from 'react';

import PageTemplate from '../PageTemplate';
import ProfileContainer from './ProfileContainer';

import fetch from 'isomorphic-fetch';



class ProfilePageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
      username: "",
      email: "",
      books_count: "",
      notes_count: "",
    }
  }

  componentWillMount() {
    this.setState({is_loading: true});

    fetch("/api/user_info", {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(json => this.setState({
        is_loading: false,
        ...json.user[0],
    }));
  }


  render() {
    return (
      <PageTemplate>
        <ProfileContainer
          user_info = {this.state} />
      </PageTemplate>
    );
  }
}


export default ProfilePageApp;
