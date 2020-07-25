import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.loading) {
        return <h2>Loading...</h2>;
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props}  />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
