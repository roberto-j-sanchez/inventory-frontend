import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EditCategory from './EditCategory';
import AddItem from '../items/AddItem';

class CategoryDetails extends Component {
  state = {};

  componentDidMount() {
    this.getSingleCategory();
  }

  getSingleCategory = () => {
    // console.log('******______******', this.props.match);
    const { params } = this.props.match;
    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          `/api/categories/${params.id}`
      )
      // .then(responseFromApi => {
      //   console.log('888888888888', this.state)
      //   const theCategory = responseFromApi.data;
      //   this.setState(theCategory);
      // })
      .then(responseFromApi => {
        const theCategory = responseFromApi.data;
        this.setState(theCategory);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderEditForm() {
    // this.setState({ showEdit: true })
    if (!this.state.title) {
      this.getSingleCategory();
    } else {
      return (
        <EditCategory
          theCategory={this.state}
          getTheCategory={this.getSingleCategory}
          {...this.props}
        />
      );
    }
  }

  deleteCategory = () => {
    const { params } = this.props.match;

    axios
      .delete(
        process.env.REACT_APP_SERVER_URL + `/api/categories/${params.id}`,
        {
          withCredentials: true
        }
      )
      .then( responseFromApi => {
        this.props.history.push('/categories');
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderAddItemForm = () => {
    if (!this.state.title) {
      this.getSingleCategory();
    } else {
      // pass the category and method getSingleCategory() as a props down to AddItem component
      return (
        <AddItem
          theCategory={this.state}
          getTheCategory={this.getSingleCategory}
        />
      );
    }
  };

  ownershipCheck = category => {
    if (this.props.loggedin && category.owner === this.props.loggedin._id) {
      return (
        <div>
          <div>{this.renderEditForm()}</div>
          <button onClick={() => this.deleteCategory(this.state._id)}>
            Delete Category
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <section>
        <h1>{this.state.title}</h1>
        <img width='150' src={this.state.image} alt={this.state.title} />
        {this.state.items && this.state.items.length > 0 && <h3>Items</h3>}
        {this.state.items && this.state.items.map((item, index) => {
          return (
            <div key={index}>
              <Link to={`/categories/${this.state._id}/items/${item._id}`}>
                {item.title}
              </Link>
            </div>
          )
        })}
        <div>{this.ownershipCheck(this.state)}</div>
        <div>{this.renderAddItemForm()}</div>
        {/* <div>{this.renderEditForm()}</div> */}
        <button onClick={() => this.deleteCategory()}>
          Delete Category
        </button>
        <br />
        <Link to={'/categories'}>Back to Categories</Link>
        <Link to={'/categories/:id'}>Details</Link>
      </section>
    );
  }
}

export default CategoryDetails;
