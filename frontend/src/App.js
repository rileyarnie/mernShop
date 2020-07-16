import React from "react";
import "./App.css";
import Navigaton from "./components/Navigation";
import ProductList from "./components/ProductList";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Navigaton />
      <Container>
        <Switch>
          <Route exact component={ProductList} path="/" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/products/:id" component={ProductDetails} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
