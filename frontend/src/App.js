import React from "react";
import "./App.css";
import Navigaton from "./components/Navigation";
import ProductList from "./components/ProductList";
import { Container } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <Navigaton />
      <Container>
        <ProductList />
      </Container>
    </div>
  );
}

export default App;
