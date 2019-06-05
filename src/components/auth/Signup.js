import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function BuiltAtIronhack() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Built at '}
      <Link
        color='inherit'
        href='https://www.ironhack.com/en/locations/miami'
      >
        Ironhack 
      </Link>
      {' Miami.'}
    </Typography>
  );
}

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fullName: '', 
      email: '', 
      password: '', 
      message: null,
      submitSuccessful: false
     };
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
    const submitSuccessful = this.state.submitSuccessful;
    if (this.props.currentUser) {
      return <Redirect to='/categories' />;
    }

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className='paper'>
          <Avatar className='avatar'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form
            className='form'
            noValidate
            onSubmit={event => this.handleFormSubmit(event)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type='text'
                  value={this.state.fullName}
                  onChange={event => this.handleChange(event)}
                  autoComplete='fname'
                  name='fullName'
                  variant='outlined'
                  required
                  fullWidth
                  id='fullName'
                  label='Full Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='email'
                  value={this.state.email}
                  onChange={event => this.handleChange(event)}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>
            <br />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className='submit'
            >
              Sign Up
            </Button>
            <br /> <br />
            <div className='message'>
              {this.state.message && <div>{this.state.message}</div>}
            </div>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <BuiltAtIronhack />
        </Box>
      </Container>
    );
  }
}

export default Signup;