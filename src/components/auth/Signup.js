import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { fullName: '', email: '', password: '', message: null };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    axios
      .post(process.env.REACT_APP_SERVER_URL + '/api/signup',
      this.state, {
        withCredentials: true
      })
      .then(responseFromServer => {
        console.log('The response from server is: ', responseFromServer);
        const  { userDoc } = responseFromServer.data;
        this.props.onUserChange(userDoc)
      })
      .catch(err => {
        console.log('Error during signup: ', err);
        if ( err.response && err.response.data) {
          return this.setState({ message: err.response.data.message})
        }
      })
  };

  render() {
    if (this.props.currentUser) {
      return (
        <section>
          <h2>You are signed up!</h2>
          <p>Welcome, {this.props.currentUser.fullName}</p>
        </section>
      );
    }
    return (
      <section>
        <h2>Sign Up</h2>

        <form onSubmit={event => this.handleFormSubmit(event)}>
          <label>
            Full Name
            <input
              type='text'
              name='fullName'
              value={this.state.fullName}
              onChange={event => this.handleChange(event)}
            />
          </label>

          <label>Email</label>
          <input
            type='email'
            name='email'
            value={this.state.email}
            onChange={event => this.handleChange(event)}
          />

          <label>
            Password
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </label>

          <button>Signup</button>
        </form>
        {this.state.message && <div>{this.state.message}</div>}

        <p>
          Already have account?
          <Link to={'/login'}>Login</Link>
        </p>
      </section>
    );
  }
}

export default Signup;