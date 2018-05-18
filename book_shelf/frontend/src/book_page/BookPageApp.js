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
    this.onAddLikeToNote = this.onAddLikeToNote.bind(this);
    this.onDeleteLikeFromNote = this.onDeleteLikeFromNote.bind(this);
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

  onAddNote(formData) {
    formData.append('book_id', this.state.book_id);

    fetch("/api/note/add_note", {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookie.get("csrftoken"),
      },
      body: formData,
    })
      .then(response => {
        if (response.status === 200) {
          this.updateNotes();
        }
      });
  }

  onAddLikeToNote(noteID) {
    this.setState({
      notes: this.state.notes.map(elem => {
        if (elem.id === noteID) {
          elem.likes_count += 1;
          elem.liked = 1;
        }
        return elem;
      })
    })

    const formData = new FormData();
    formData.append('object_id', noteID);


    fetch("/api/note/add_like", {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookie.get("csrftoken"),
      },
      body: formData,
    });
  }

  onDeleteLikeFromNote(noteID) {
    this.setState({
      notes: this.state.notes.map(elem => {
        if (elem.id === noteID) {
          elem.liked = 0;
          elem.likes_count -= 1;
        }
        return elem;
      })
    })

    const formData = new FormData();
    formData.append('object_id', noteID);

    fetch("/api/note/delete_like", {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookie.get("csrftoken"),
      },
      body: formData,
    });
  }


  render() {
    return (
      <PageTemplate>
        <BookContainer
          book={this.state.book}
          notes={this.state.notes}
          onAddLikeToNote={this.onAddLikeToNote}
          onDeleteLikeFromNote={this.onDeleteLikeFromNote}
          is_loading={this.state.is_loading}
          onAddNote={this.onAddNote}/>
      </PageTemplate>
    );
  }
}


export default BookPageApp;
