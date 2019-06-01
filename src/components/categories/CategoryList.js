import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, NavItem } from 'reactstrap';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

import AddCategory from './AddCategory';
import AddItem from '../items/AddItem'

class CategoryList extends Component {
  state = { listOfCategories: [] };

  // lifecycle method to fetch the data from API
  getAllCategories() {
    // retrieve the info from API as soon as the component loads
     axios
       .get(process.env.REACT_APP_SERVER_URL + "/api/categories", {
         withCredentials: true
       })
       .then(responseFromApi => {         
         this.setState({
           listOfCategories: responseFromApi.data
         });
       })
       .catch(err => console.log('err while gettting data: ', err))
  }

  componentDidMount() {
    this.getAllCategories();
  }

  render() {
    const { listOfCategories } = this.state;
    console.log('what is going on: ', this.state)
    return (
      <Container>
        <h2>Categories</h2>
        <div>
          {listOfCategories.map(category => {
            return (
              <div key={category._id}>
                <Link to={`/categories/${category._id}`}>
                  <h3>{category.title}</h3>
                </Link>

                <ul>
                  {category.items.map((item, index) => {
                    return <li key={index}>{item.itemName}</li>;
                  })}
                </ul>
                <img
                  width='150'
                  src={category.image}
                  alt={category.title}
                />
              </div>
            );
          })}
        </div>
        <div style={{width: '30%', float: 'right'}}>
          <NavLink to='/add-category'>Add Category</NavLink>
        </div>
      </Container>
    );
  }
}

export default CategoryList;