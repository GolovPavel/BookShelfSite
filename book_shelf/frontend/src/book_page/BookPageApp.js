import React, { Component } from 'react';

import PageTemplate from '../PageTemplate';
import BookContainer from './BookContainer';

import fetch from 'isomorphic-fetch';


class BookPageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
      book_id: props.match.params.id,
      book: {},
      notes: [],
    }
  }

  componentWillMount() {
    this.setState({is_loading: true});

    fetch(`/api/book/${this.state.book_id}`, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(json => this.setState({
        is_loading: false,
        book: {
          ...json.book[0],
        },
        notes: json.notes,
      }));
  }


  render() {
    return (
      <PageTemplate>
        <BookContainer
          book={this.state.book}
          notes={this.state.notes}
          is_loading={this.state.is_loading} />
      </PageTemplate>
    );
  }
}


export default BookPageApp;
