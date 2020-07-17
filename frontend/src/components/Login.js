import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    this.props.handleLogin(email, password);
    this.props.history.push("/");
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="mt-4">
        <Card
          style={{ width: "25rem", marginRight: "auto", marginLeft: "auto" }}
        >
          <Card.Title className="mt-4">Login</Card.Title>
          <Card.Body>
            <Form onSubmit={(event) => this.handleSubmit(event)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleEmailChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
              </Form.Group>

              <Button
                className="btn mr-2"
                disabled={
                  this.state.email.trim() === "" ||
                  this.state.password.trim() === ""
                }
                variant="primary"
                type="submit"
                onClick={(event) => this.handleSubmit(event)}
              >
                Login
              </Button>

              <small className="text-muted">
                Don't Have an account? Register <Link to="/register">here</Link>{" "}
              </small>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (email, password) =>
      dispatch(actionTypes.authLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
