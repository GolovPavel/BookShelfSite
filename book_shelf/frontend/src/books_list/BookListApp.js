import React, { Component } from 'react';

import PageTemplate from '../PageTemplate';
import BooksContainer from './BooksContainer';

import fetch from 'isomorphic-fetch';


class BookListApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_loading: false,
      books: [],
      current_page: 0,
      num_pages: 0,
    }

    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    this.setState({is_loading: true});

    fetch("/api/user_books", {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(json => this.setState({
        books: [
          ...json.books,
        ],
        is_loading: false,
        current_page: parseInt(json.current_page, 10),
        num_pages: parseInt(json.num_pages, 10),
      }));
  }

  changePage(page) {
    this.setState({is_loading: true});

    const url = `/api/user_books?page=${page}`;

    fetch(url, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(json => this.setState({
        books: [
          ...json.books,
        ],
        is_loading: false,
        current_page: parseInt(json.current_page, 10),
        num_pages: parseInt(json.num_pages, 10),
      }));
  }

  render() {
    return (
      <PageTemplate>
        <BooksContainer
          books={this.state.books}
          num_pages={this.state.num_pages}
          current_page={this.state.current_page}
          is_loading={this.state.is_loading}
          onChangePage={this.changePage} />
      </PageTemplate>
    );
  }
}


export default BookListApp;
