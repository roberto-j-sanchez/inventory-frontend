import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EditCategory from './EditCategory';
import AddItem from '../items/AddItem';

class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      // we need the initial "items" array to avoid an error with ".map()"
      items: []
    };
  }

  componentDidMount() {
    this.getSingleCategory();
  }

  getSingleCategory = () => {
    console.log('******______******', this.props.match);
    const { params } = this.props.match;
    axios
      .get(
        process.env.REACT_APP_SERVER_URL +
          `/api/categories/${params.categoryId}`
      )
      // .then(responseFromApi => {
      //   console.log('888888888888', this.state)
      //   const theCategory = responseFromApi.data;
      //   this.setState(theCategory);
      // })
      .then(responseFromApi => {
        this.setState(responseFromApi.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  showEditForm() {
    this.setState({ showEdit: true });
  }

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

  deleteCategory(id) {
    // const { params } = this.props.match;

    axios
      .delete(
        process.env.REACT_APP_SERVER_URL + `/api/categories/${id}`,
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
    const { title, image, items } = this.state;
    console.log('****************', this.state);
    return (
      <section>
        {this.state.showEdit ? (
          <EditCategory theCategory={this.state}
          {...this.props} />
        ) : (
          <section>
            <h2>{title}</h2>
          </section>
        )
        
          })}
        <div>{this.ownershipCheck(this.state)}</div>
        <div>{this.renderAddItemForm()}</div>
        {/* <div>{this.renderEditForm()}</div> */}
        <button onClick={() => this.deleteCategory()}>Delete Category</button>
        <br />
        <Link to={'/categories'}>Back to Categories</Link>
        <Link to={'/categories/:id'}>Details</Link>
      </section>
    );
  }
}

export default CategoryDetails;
