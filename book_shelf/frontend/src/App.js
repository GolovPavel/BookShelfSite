import React, { Component } from 'react';

import Navbar from './Navbar';
import BooksContainer from './BooksContainer';

import fetch from 'isomorphic-fetch';

import './css/App.css';

class App extends Component {
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
        current_page: json.current_page,
        num_pages: json.num_pages,
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
        current_page: json.current_page,
        num_pages: json.num_pages,
      }));
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <BooksContainer
          books={this.state.books}
          num_pages={this.state.num_pages}
          current_page={this.state.current_page}
          is_loading={this.state.is_loading}
          onChangePage={this.changePage} />
      </div>
    );
  }
}

export default App;
