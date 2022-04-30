import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Navbar, Nav, NavItem, Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import ProductList from './ProductList.jsx';
import ProductEdit from './ProductEdit.jsx';
import ProductImg from './ProductImg.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

const NavBar = () => (
  <Navbar bsStyle="inverse" style={{ borderRadius: 0 }}>
  {/* <Navbar bg="primary" variant="dark"> */}
    <Navbar.Header>
      <Navbar.Brand>My Company Inventory</Navbar.Brand>
    </Navbar.Header>

    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Home</NavItem>
      </LinkContainer>
      <LinkContainer to="/products">
        <NavItem>Product List</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);
const Contents = () => (
  <div>
    <NavBar />

    <Grid fluid>
      <Switch>
        <Redirect exact from="/" to="/products" />
        <Route path="/products" component={ProductList} />
        <Route path="/edit/:product_id" component={ProductEdit} />
        <Route path="/img/:product_id" component={ProductImg} />
        <Route component={NotFound} />
      </Switch>
    </Grid>
  </div>
);

export default Contents;