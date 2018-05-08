import React from 'react';
import PropTypes from 'prop-types';

import '../css/add_book/AddBookForm.css';

class AddBookForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        description: "",
      }

      this.titleChangedHandler = this.titleChangedHandler.bind(this);
      this.descriptionChangedHandler = this.descriptionChangedHandler.bind(this);
      this.fileChangedHandler = this.fileChangedHandler.bind(this);
      this.onAddBookButtonClicked = this.onAddBookButtonClicked.bind(this);
    }

    titleChangedHandler(event) {
      this.setState({title: event.target.value});
    }

    descriptionChangedHandler(event) {
      this.setState({description: event.target.value});
    }

    fileChangedHandler(event) {
      this.setState({picture: event.target.files[0]});
    }

    onAddBookButtonClicked() {
      const fd = new FormData();
      fd.append('title', this.state.title);
      fd.append('description', this.state.description);
      if (this.state.picture) {
          fd.append('picture', this.state.picture, this.state.picture.name);
      }

      this.props.onAddBook(fd);
    }

    render() {
      return (
        <form className="AddBookForm">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-12 col-lg-3 col-xl-3">
                <h4>
                  <i className="fas fa-heading"></i> Book title<p className="text-danger d-inline">*</p>
                </h4>
              </div>
              <div className="col-xs-12 col-md-12 col-lg-9 col-xl-9">
                <input type="text" onChange={this.titleChangedHandler} className="form-control" placeholder="Title..." />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-xs-12 col-md-12 col-lg-3 col-xl-3">
                <h4>
                  <i className="fas fa-keyboard"></i> Book description<p className="text-danger d-inline">*</p>
                </h4>
              </div>
              <div className="col-xs-12 col-md-12 col-lg-9 col-xl-9">
                <textarea onChange={this.descriptionChangedHandler} className="form-control" rows="3" placeholder="Description..."></textarea>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-xs-12 col-md-12 col-lg-3 col-xl-3">
                <h4><i className="fas fa-image"></i> Book picture</h4>
              </div>
              <div className="col-xs-12 col-md-12 col-lg-9 col-xl-9">
                <input
                  style={{display: 'none'}}
                  type="file" className="form-control-file"
                  onChange={this.fileChangedHandler}
                  ref={fileInput => this.fileInput = fileInput}/>
                <button
                  onClick={() => this.fileInput.click()}
                  type="button" className="btn btn-secondary btn-lg">
                  Upload file
                </button>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-xs-12 col-md-12 col-lg-12 col-xl-12 text-center">
                <button onClick={this.onAddBookButtonClicked} type="button" className="btn btn-success btn-lg">Add book</button>
              </div>
            </div>
          </div>
        </form>
      );
    }
}

AddBookForm.propTypes = {
  onAddBook: PropTypes.func.isRequired,
}

AddBookForm.defaultProps = {
  onAddBook: f=>f,
}

export default AddBookForm;
