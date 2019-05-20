import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EditCategory from './EditCategory';
import AddItem from '../items/AddItem';

class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false
    };
  }

  // execute getSingleCategory() method to
  // communicate with backend route through axios call
  componentDidMount() {
    const { params } = this.props.match;

    axios
      .get(process.env.REACT_APP_SERVER_URL + `/api/categories/${params.id}`)
      .then(responseFromApi => {
        this.setState(responseFromApi.data)
      })
      .catch(err => console.log(err));
  }

  renderEditForm() {
    this.setState({ showEdit: true })
  }

  // getSingleCategory = () => {
  //   const { params } = this.props.match;
  //   axios
  //     .get(`http://localhost:5000/api/categories/${params.id}`, 
  //       { withCredentials: true })
  //     .then(responseFromApi => {
  //       const theCategory = responseFromApi.data;
  //       this.setState(theCategory);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  deleteCategory = (id) => {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + `/api/categories/${id}`)
      .then((responseFromApi) => {
        this.props.history.push('/categories'); 
      })
      .catch(err => {
        console.log(err);
      });
  };

  // renderAddItemForm = () => {
  //   if (!this.state.title) {
  //     this.getSingleCategory();
  //   } else {
  //     // pass the category and method getSingleCategory() as a props down to AddItem component
  //     return (
  //       <AddItem
  //         theCategory={this.state}
  //         getTheCategory={this.getSingleCategory}
  //       />
  //     );
  //   }
  // };

  render() {
    const { title, image, items } = this.state;
    return (
      <section>
        {/* access the categories's properties */}
        {this.state.showEdit ? (
          <EditCategory theCategory={this.state} {...this.props} />
        ) : (
          <section>
            <h2>{title}</h2>
            <img src={image} alt={title} width='200' />
          </section>
        )}
        <img src={this.state.image} width='200' alt='' />
        <ul>
          {items.map((oneItem, index) => {
            return <li key={index}>{oneItem}</li>
          })}
        </ul>

        <button onClick={() => this.renderEditForm()}>{this.renderEditForm()}</button>
        <button onClick={() => this.deleteCategory()}>
          Delete Category
        </button>

        <br />
        <div>{this.renderAddItemForm()}</div>
        <Link to={'/categories'}>Back to Categories</Link>
      </section>
    );
  }
}

export default CategoryDetails;
