import React, { Component } from 'react';

import PageTemplate from '../PageTemplate';
import BookContainer from './BookContainer';

import fetch from 'isomorphic-fetch';
import Cookie from 'js-cookie';

class BookPageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
      book_id: props.match.params.id,
      book: {},
      notes: [],
    }

    this.onAddNote = this.onAddNote.bind(this);
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

  updateNotes() {
    fetch(`/api/book/${this.state.book_id}`, {
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(json => this.setState({
        notes: json.notes,
      }));
  }

  onAddNote(title, note_text) {
    const jsonData = {
      title,
      note_text,
      book_id: this.state.book_id,
    };

    fetch("/api/note/add_note", {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookie.get("csrftoken"),
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            notes: [
              {
                title,
                note_text,
                likes_count: 0,
              },
              ...this.state.notes,
            ]
          })
        }
      });
  }


  render() {
    return (
      <PageTemplate>
        <BookContainer
          book={this.state.book}
          notes={this.state.notes}
          is_loading={this.state.is_loading}
          onAddNote={this.onAddNote}/>
      </PageTemplate>
    );
  }
}


export default BookPageApp;
