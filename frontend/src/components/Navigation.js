import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Navigation extends Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              iSuperStore
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link
                to="/"
                className="mr-4"
                style={{ textDecoration: "none", color: "black" }}
              >
                Home
              </Link>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src="https://img.icons8.com/pastel-glyph/24/000000/shopping-cart.png"
                  alt="cart"
                />

                <strong className="ml-1">
                  {this.props.cart.length < 1 ? "" : this.props.cart.length}
                </strong>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart.items,
  };
};

export default connect(mapStateToProps)(Navigation);
