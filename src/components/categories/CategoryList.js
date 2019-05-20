import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddCategory from './AddCategory';

class CategoryList extends Component {
  constructor() {
    super();
    this.state = { listOfCategories: [] };
  }

  getAllCategories = () => {
    axios
      .get(`http://localhost:5000/api/categories`,
       { withCredentials: true })
      .then(responseFromApi => {
        this.setState({
          listOfCategories: responseFromApi.data
        });
      });
  };

  // lifecycle method to fetch the data from API
  componentDidMount() {
    this.getAllCategories();
  }

  render() {
    return (
      <section>
        <div style={{ width: '60%', float: 'left' }}>
          {/* map() method lists all of the categories */}
          {this.state.listOfCategories.map(category => {
            return (
              <div key={category._id}>
                <Link to={`/categories/${category._id}`}>
                  <h3>{category.title}</h3>
                </Link>
                <ul>
                  {category.items.map((item, index) => {
                    return <li key={index}>{item.title}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div style={{ width: '40%', float: 'right' }}>
          <AddCategory getData={() => this.getAllCategories()} />
        </div>
      </section>
    );
  }
}

export default CategoryList;