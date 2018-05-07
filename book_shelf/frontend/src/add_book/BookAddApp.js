import React, { Component } from 'react';

import PageTemplate from '../PageTemplate';
import BookAddContainer from './BookAddContainer';

import fetch from 'isomorphic-fetch';
import Cookie from 'js-cookie';

class BookAddApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
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
      .then(response => console.log(response.status))
  }

  render() {
    return (
      <PageTemplate>
        <BookAddContainer
          onAddBook={this.onAddBook} />
      </PageTemplate>
    );
  }
}


export default BookAddApp;
