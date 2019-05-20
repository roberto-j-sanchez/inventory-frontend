import React, { Component } from 'react';
import axios from 'axios';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.theCategory.title,
      image: this.props.theCategory.image
    };
  }

  handleFormSubmit = event => {
    const { title, image } = this.state;

    event.preventDefault();

    axios
      .put(
        `http://localhost:5000/api/categories/${this.props.theCategory._id}`,
        { title, image },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getTheCategory();
        // after submitting the form, redirect to '/categories'
        this.props.history.push('/categories');
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
          //   console.log("Upload Image", response.data);
          this.setState({ image: response.data.fileUrl });
        })
        .catch(err => {
          console.log('Upload Image ERROR', err);
          alert('Sorry! Something went wrong.');
        });
    }

  render() {
    return (
      <section>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />
          <label>Image option 1</label>
          <input
            type='file'
            name='image'
            value={this.state.image}
            onChange={e => this.uploadImage(e)}
          />

          <label>Image option 2</label>
          <input 
            type='file' 
            onChange={e => this.uploadImage(e)} />
          <img src={this.state.image} width='200' alt=''/>

          <input type='submit' value='Submit' />
        </form>
      </section>
    );
  }
}

export default EditCategory;