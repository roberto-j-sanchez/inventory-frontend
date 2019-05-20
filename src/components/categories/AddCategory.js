import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', image: '', isSubmitSuccessful: false };

    console.log('Who: ', this.props)
  }

  handleFormSubmit = event => {
    event.preventDefault();

    axios
      .post(
        'http://localhost:5000/api/categories',
        this.state,
        { withCredentials: true }
      )
      .then(respnse => {
        console.log('Add Category', respnse.data)
        this.setState({ isSubmitSuccessful: true });
      })
      .catch(error => console.log(error));
  };

  // for all fields except images
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // upload image
  uploadImage(event) {
    const { files } = event.target;
    console.log('File SELECTED', files[0]);

    // the "FormData" class will format the files for sending to our API
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
  };

  render() {
    if (!this.props.currentUser) {
      return <Redirect to='login' />
    }

    if (this.state.isSubmitSuccessful) {
      return <Redirect to='/categories' />
    }

    return (
      <section>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />

          <label>Image</label>
          <input type='file' onChange={e => this.uploadImage(e)} />
          <img src={this.state.image} width='200' alt=''/>

          {/* <input type='submit' value='Submit' /> */}

          <button>Save</button>
        </form>
      </section>
    );
  }
}

export default AddCategory;
