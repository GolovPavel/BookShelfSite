import React from 'react';
import PropTypes from 'prop-types';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import '../css/book_page/AddNoteForm.css';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AddNoteForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        titleState: "",
        editorState: EditorState.createEmpty(),
      }

      this.onChangeTitleState = this.onChangeTitleState.bind(this);
      this.onChangeEditorState = this.onChangeEditorState.bind(this);
      this.onAddNoteButtonClicked = this.onAddNoteButtonClicked.bind(this);
    }

    onChangeEditorState(editorState) {
      this.setState({editorState});
    }

    onChangeTitleState(event) {
      this.setState({titleState: event.target.value});
    }

    onAddNoteButtonClicked() {
      const title = this.state.titleState;
      const note_text = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

      if (note_text == '<p></p>\n') {
        return;
      }

      this.props.onAddNote(title, note_text);

      const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
      this.setState({
        titleState: "",
        editorState
      });
    }

    render() {
      const { editorState } = this.state;

      return (
        <div className="addNoteForm">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
            </div>
            <input type="text"
              value={this.state.titleState}
              onChange={this.onChangeTitleState}
              className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
          </div>

          <Editor
            editorState={editorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={this.onChangeEditorState}
            placeholder="Enter you note..."
            toolbar={{
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
            }}
          />

          <button
            type="button"
            onClick={this.onAddNoteButtonClicked}
            className="addNoteButton btn btn-success mt-2 d-block mx-auto">
            Add note
          </button>
        </div>
      )
    }
}

AddNoteForm.propTypes = {
  onAddNote: PropTypes.func.isRequired,
}

AddNoteForm.defaultProps = {
  onAddNote: f=>f,
}

export default AddNoteForm;
