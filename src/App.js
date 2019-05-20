import React, { Component } from 'react';
import './App.css';
import { Switch, NavLink, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// import AuthService from './components/auth/AuthService';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/Home';
import NotFound from './components/auth/NotFound';

import CategoryList from './components/categories/CategoryList';
import CategoryDetails from './components/categories/CategoryDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + '/api/loggedin', 
        {
        withCredentials: true
        })
      .then(response => {
        // console.log('Check user', response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
      })
      .catch(err => {
        console.log('Check User ERROR', err);
      });
  }

  // method for updating currentUser
  syncCurrentUser = userDoc => {
    this.setState({
      currentUser: userDoc
    });
  };

  logoutClick() {
    axios
      .delete(
        process.env.REACT_APP_SERVER_URL + '/api/logout',
        { withCredentials: true } // FORCE axios to send cookies across domains
      )
      .then(() => {
        // make "currentUser" empty again (like it was at the start)
        this.syncCurrentUser(null);
      })
      .catch(err => {
        console.log('Logout ERROR', err);
        alert('Sorry! Something went wrong.');
      });
  }

  render() {

      return (
        <div className='App'>
          <header>
            <h1>allMine</h1>
            <nav>
              {this.state.currentUser ? (
                <span>
                  <NavLink to='/'>Home</NavLink>
                  <NavLink to='/categories'>Categories</NavLink>
                  <NavLink to='/categories/:id'>Category Details</NavLink>

                  {/* <b>{this.currentUser.fullName}</b> */}
                  <button onClick={() => this.logoutClick()}>
                    Log Out
                  </button>
                </span>
              ) : (
                <span>
                  <NavLink to='/signup'>Signup</NavLink>
                  <NavLink to='/login'>Log In</NavLink>
                </span>
              )}
            </nav>
          </header>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/categories' component={CategoryList} />
            <Route path='/categories/:id' component={CategoryDetails} />
            <Route
              path='/signup'
              render={() => (
                <Signup
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />
            <Route
              path='/login'
              render={() => (
                <Login
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route component={NotFound} />
          </Switch>

          <footer>
            <p>Made at Ironhack</p>
          </footer>
        </div>
      );
    }

  
}

export default App;
