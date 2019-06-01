import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: null,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit(event) {
    event.preventDefault();
    // const { email, password } = this.state;
    // this.service
    //   .login(email, password)
    //   .then(response => {
    //     this.setState({ email: '', password: '' });
    //     this.props.getUser(response);
    //   })
    //   .catch(error => console.log(error));
    axios.post(process.env.REACT_APP_SERVER_URL + '/api/login', this.state, {
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
      return <Redirect to='/categories' />
    }
    return (
      <section>
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