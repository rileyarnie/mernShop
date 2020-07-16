import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";

class Login extends Component {
  state = {
    email: "",
    password: "",
    username: "",
  };

  handleSubmit = (event) => {
    const { email, password, username } = this.state;
    event.preventDefault();
    this.props.handleSignUp(username, email, password);
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ username: event.target.value });
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
          <Card.Title className="mt-4">Register</Card.Title>
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
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  onChange={this.handleNameChange}
                />
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
                Register
              </Button>
              <small className="text-muted">
                Already have an account? Login <Link to="/login">here</Link>{" "}
              </small>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (username, email, password) =>
      dispatch(actionTypes.authSignup(username, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
