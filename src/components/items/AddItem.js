import React, { Component } from 'react';
import axios from 'axios';

class AddItem extends Component {
  constructor(props) {
    super(props);
    // "isShowing: false" helps to toggle add item form
    this.state = {
      itemName: '',
      image: '',
      quantity: '',
      price: '',
      notes: '',
      info: '',
      serialNumber: '',
      web: '',
      purchaseDate: '',
      returnDate: '',
      warranty: '',
      isShowing: false    // toggle add item form
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const {
      itemName,
      image,
      quantity,
      price,
      notes,
      info,
      serialNumber,
      web,
      purchaseDate,
      returnDate,
      warranty
    } = this.state;

    // the category is referenced by the ID in the item-model on the server side
    // ( category: {type: Schema.Types.ObjectId, ref: 'Category'})
    const categoryID = this.props.theCategory._id;

    // { title, image, categoryID } => this is 'req.body' that will be received on the server side in this route, so the names NEED TO MATCH
    axios
      .post('http://localhost:5000/api/items', {
        itemName,         // required
        image,
        quantity,         // required
        price,            // required
        notes,
        info,
        serialNumber,
        web,
        purchaseDate,
        returnDate,
        warranty,
        categoryID        // required
      })
      .then(() => {
        // after submitting the form, retrieve category so the new item is displayed
        this.props.getTheCategory();
        this.setState({
          itemName: '',
          image: '',
          quantity: '',
          price: '',
          notes: '',
          info: '',
          serialNumber: '',
          web: '',
          purchaseDate: '',
          returnDate: '',
          warranty: ''
        });
      })
      .catch(error => console.log(error));
  };

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
        // console.log("Upload Image", response.data);
        this.setState({ image: response.data.fileUrl });
      })
      .catch(err => {
        console.log('Upload Image ERROR', err);
        alert('Sorry! Something went wrong.');
      });
  }

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  };

  showAddItemForm = () => {
    const  { itemName, image, quantity, price, notes, info, serialNumber, web, purchaseDate, returnDate, warranty } = this.state;

    if (this.state.isShowing) {
      return (
        <section>
          <h3>Add Item</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Name</label>
            <input
              type='text'
              name='itemName'
              value={itemName}
              onChange={e => this.handleChange(e)}
            />

            <label>Image</label>
            <input type='file' onChange={e => this.uploadImage(e)} />
            <img src={image} width='200' alt=''/>

            <label>Quantity</label>
            <input
              type='number'
              name='quantity'
              value={quantity}
              onChange={e => this.handleChange(e)}
            />

            <label>Price</label>
            <input
              type='number'
              name='price'
              value={price}
              onChange={e => this.handleChange(e)}
            />

            <label>Notes</label>
            <input
              type='text'
              name='notes'
              value={notes}
              onChange={e => this.handleChange(e)}
            />

            <label>Info</label>
            <input
              type='text'
              name='info'
              value={info}
              onChange={e => this.handleChange(e)}
            />

            <label>Serial Number</label>
            <input
              type='text'
              name='serialNumber'
              value={serialNumber}
              onChange={e => this.handleChange(e)}
            />

            <label>Web</label>
            <input
              type='text'
              name='web'
              value={web}
              onChange={e => this.handleChange(e)}
            />

            <label>Purchase Date</label>
            <input
              type='date'
              name='purchaseDate'
              value={purchaseDate}
              onChange={e => this.handleChange(e)}
            />

            <label>Return Date</label>
            <input
              type='date'
              name='returnDate'
              value={returnDate}
              onChange={e => this.handleChange(e)}
            />

            <label>Warranty Expiration Date</label>
            <input
              type='date'
              name='warranty'
              value={warranty}
              onChange={e => this.handleChange(e)}
            />

            <input type='submit' value='Save' />
          </form>
        </section>
      );
    }
  };

  render() {
    return (
      <div>
        <hr />
        <button onClick={() => this.toggleForm()}>Add item</button>
        {this.showAddItemForm()}
      </div>
    );
  }
}

export default AddItem;