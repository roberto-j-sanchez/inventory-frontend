import React, { Component } from 'react';
import axios from 'axios';
import { Switch, NavLink, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';
import NavBar from './components/navbar/Navbar';

import AddCategory from './components/categories/AddCategory';
import CategoryList from './components/categories/CategoryList';
import CategoryDetails from './components/categories/CategoryDetails';

import NotFound from './components/auth/NotFound';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    // React doesn't know at the start if we are logged-in or not
    // (but we can ask the server if we are through an API request)
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + '/api/checkuser',
        { withCredentials: true } // FORCE axios to send cookies across domains
      )
      .then(response => {
        // console.log("Check User", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
      })
      .catch(err => {
        console.log('Check User ERROR', err);
        alert('Sorry! Something went wrong.');
      });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

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
        <NavBar />
        <header>
          <nav>

            {this.state.currentUser ? (
              <span>
                {/* <NavLink to="/user-profile">User Profile</NavLink> */}
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/add-category'>Add Category </NavLink>
                <NavLink to='/categories'>Categories</NavLink>
                <Switch>
                  <Route 
                    user={this.state.currentUser}
                    path='/categories/:id'
                    component={CategoryDetails}
                  />
                </Switch>

                <br />
                <b>{this.state.currentUser.email}</b>
                <button onClick={() => this.logoutClick()}>Log Out</button>
              </span>
            ) : (
              <span>
                <NavLink to='/signup'>Signup </NavLink>
                <NavLink to='/login'>Login </NavLink>{' '}
                <NavLink to='/add-category'>Add Category </NavLink>
              </span>
            )}
          </nav>
        </header>
        <Switch>
          <Route exact path='/' component={Home} />

          <Route path='/categories' component={CategoryList} />
          <Route
            path='/categories/:categoryId'
            component={CategoryDetails}
          />

          {/* <Route path="/add-phone" component={AddPhone} /> */}
          <Route
            path='/add-category'
            render={() => (
              <AddCategory currentUser={this.state.currentUser} />
            )}
          />

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

          {/* 404 route ALWAYS LAST */}
          <Route component={NotFound} />
        </Switch>

      </div>
    );
  }
}

export default App;