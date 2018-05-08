import React, { Component } from 'react';

import PageTemplate from '../PageTemplate';
import BookAddContainer from './BookAddContainer';

import fetch from 'isomorphic-fetch';
import Cookie from 'js-cookie';

class BookAddApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false,
      isError: false,
      errorMessage: "",
    }
    this.onAddBook = this.onAddBook.bind(this);
  }

  onAddBook(formData) {
    fetch('/api/book/add_book/', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookie.get("csrftoken"),
      },
      body: formData,
    })
      .then(response => {
        (response.status === 200) ?
          this.setState({
            isSuccess: true,
            isError: false,
          }) :
          this.setState({
            isError: true,
            isSuccess: false,
          })

          return response.text();
      }).then(text => this.setState({errorMessage: text}));
  }

  render() {
    return (
      <PageTemplate>
        <BookAddContainer
          onAddBook={this.onAddBook}
          isSuccess={this.state.isSuccess}
          isError={this.state.isError}
          errorMessage={this.state.errorMessage} />
      </PageTemplate>
    );
  }
}


export default BookAddApp;
