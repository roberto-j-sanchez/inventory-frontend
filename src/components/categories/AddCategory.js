import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: '',
      items: [],
      isSubmitSuccessful: false
    };
  }

  // for all fields except images
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    axios
      .post(
        process.env.REACT_APP_SERVER_URL + '/api/add-category',
        this.state,
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log('Add Category', response.data);
        this.setState({ isSubmitSuccessful: true });
      })
      .catch(error => {
        console.log('ADD CATEGORY ERROR: ', error);
      });
  }

  // upload image
  uploadImage(event) {
    const { files } = event.target;
    console.log('File SELECTED', files[0]);

    // the "FormData" class will format the files sent to API
    const uploadData = new FormData();
    // the name "fileSubmission" is the one your backend route defined.
    uploadData.append('fileSubmission', files[0]);

    axios
      .post(process.env.REACT_APP_SERVER_URL + '/api/upload-file', uploadData, {
        withCredentials: true
      })
      .then(response => {
        this.setState({ image: response.data.fileUrl });
      })
      .catch(err => {
        console.log('Upload Image ERROR', err);
        alert('Sorry! Something went wrong.');
      });
  }

  syncItems(event, index) {
    const { items } = this.state;
    // update the spec value at the given index
    items[index] = event.target.value;
    // set the state with the updated items array
    this.setState({ items });
  }

  render() {
    if (!this.props.currentUser) {
      return <Redirect to='login' />;
    }

    if (this.state.isSubmitSuccessful) {
      return <Redirect to='/categories' />;
    }

    return (
      <section>
        <h2>Add a Category</h2>

        <form onSubmit={event => this.handleFormSubmit(event)}>
          <label>Name</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={event => this.handleChange(event)}
          />

          <label>Image</label>
          <input type='file' onChange={event => this.uploadImage(event)} />
          <img src={this.state.image} width='200' alt='' />

          <button>Save</button>
        </form>
      </section>
    );
  }
}

export default AddCategory;
