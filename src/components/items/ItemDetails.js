import React, { Component } from 'react';
import axios from 'axios';

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getTheItem();
  }

  getTheItem = () => {
    const { params } = this.props.match;
    axios
      .get(
        `http://localhost:5000/api/categories/${params.id}/tasks/${params.taskId}`
      )
      .then(responseFromApi => {
        const theItem = responseFromApi.data;
        this.setState(theItem);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.image}</p>
      </div>
    );
  }
}

export default ItemDetails;
