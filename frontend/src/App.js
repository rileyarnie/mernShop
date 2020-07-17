import React, { Component } from "react";
import "./App.css";
import Navigaton from "./components/Navigation";
import ProductList from "./components/ProductList";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/actionTypes";

class App extends Component {
  componentDidMount() {
    this.props.checkSignUp();
  }

  render() {
    return (
      <div className="App">
        <Navigaton {...this.props} />
        <Container>
          <Switch>
            <Route exact component={ProductList} path="/" />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={SignUp} />{" "}
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products/:id" component={ProductDetails} />
          </Switch>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    token: state.authReducer.token,
  };
};

const mapDispactchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(actionTypes.authLogout()),
    checkSignUp: () => dispatch(actionTypes.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispactchToProps)(App);
