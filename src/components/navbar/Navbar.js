// import React, { Component } from 'react';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   Container
// } from 'reactstrap';

// class NavBar extends Component {
//     state = {
//       isOpen: false
    
//   }

//   toggle = () => {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }

//   render() {
//     return (
//       <div>
//         <Navbar color='dark' dark expand='sm' className='mb-5'>
//           <Container>
//             <NavbarBrand href='/'>
//               <h2>allMine</h2>  
//             </NavbarBrand>
//             <NavbarToggler onClick={this.toggle} />
//             <Collapse isOpen={this.state.isOpen} navbar>
//               <Nav className='ml-auto' navbar>
//                 <NavItem>
//                   <NavLink href='/signup'>Signup</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink href='/login'>
//                     Login
//                   </NavLink>
//                 </NavItem>
//               </Nav>
//             </Collapse>
//           </Container>
//         </Navbar>
//       </div>
//     );
//   }
// }

// export default NavBar;

import React from 'react';
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            <Link href='/' color='inherit'>allMine</Link>
          </Typography>
          <Button color='inherit' href='/signup'>
            Sign Up
          </Button>
          <Button color='inherit' href='/login'>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}