import React, { Component } from 'react';
import axios from 'axios';

// import { Link } from "react-router-dom";

class EditItem extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.thePhone)
    const { itemName, image, quantity, price, } = this.props.theItem;
    this.state = {
      itemName: '',
      image: '',
      quantity: '',
      price: ''
    };
  }

  // for all fields except images 
  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  syncImages(event, index) {
    const { images } = this.state;
    // update the spec value at the given index
    images[index] = event.target.value;
    // set the state with the updated images array
    this.setState({ images });
  }

  handleSubmit(event) {
    // stop the page refresh
    event.preventDefault();

    // PUT and POST requests receive a 2nd argument: the info to submit
    // (we are submitting the state we've gathered from the form)
    axios
      .put(
        process.env.REACT_APP_SERVER_URL +
          `/api/items/${this.props.theItem._id}`,
        this.state,
        { withCredentials: true } // FORCE axios to send cookies across domains
      )
      .then(response => {
        //   instead of using <Redirect /> we use this.props.history.push()
        this.props.history.push('/item-list');
      })
      .catch(err => {
        console.log('Update Item ERROR', err);
        alert('Sorry! Something went wrong.');
      });
  }

  render() {
    const { itemName, image, quantity, price } = this.state;
    return (
      <section>
        <h2>
          Edit {itemName} by {image}{' '}
        </h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label> Item </label>
          <input
            value={itemName}
            onChange={event => this.genericSync(event)}
            type='text'
            name='itemName'
          />

          
          <label> Quantity </label>
          <input
            value={quantity}
            onChange={event => this.genericSync(event)}
            type='number'
            name='quantity'
          />

          <label> Price </label>
          <input
            value={price}
            onChange={event => this.genericSync(event)}
            type='number'
            name='price'
          />

          
                    

          <br />
          <label> Images </label>
          <br />
          <br />
          
          
          <button> Save </button>
        </form>
      </section>
    );
  }
}

export default EditItem;