import React, { Component } from 'react';
// import AuthService from './AuthService';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: null
    };
    // this.state = new AuthService();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:5000/api/login', this.state, {
      withCredentials: true
    })
    .then(response => {
      console.log('Login Page', response.data);
      const { userDoc } = response.data;
      this.props.onUserChange(userDoc);
    })
    .catch(err => {
      if (err.response && err.response.data) {
        console.error('API response', err.response.data)
        return this.setState({
          message: err.response.data.message
        })
      }
    });
  }

  render() {
    if (this.props.currentUser) {
      return <Redirect to='/' />
    }
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <form onSubmit={event => this.handleFormSubmit(event)}>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={this.state.email}
            onChange={event => this.handleChange(event)}
          />

          <label>Password</label>
          <input
            type='password'
            name='password'
            value={this.state.password}
            onChange={event => this.handleChange(event)}
          />

          <button>Log In</button>
        </form>
        {this.state.message && <div> {this.state.message} </div>}
        <p>
          Don't have an account?  <Link to={'/signup'}> Signup </Link>
        </p>
      </section>
    );
  }
}
 
export default Login;