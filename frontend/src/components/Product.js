import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";

class Product extends Component {
  render() {
    return (
      <Col md={4} className="mt-4">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={this.props.item.image}
            alt={this.props.item.name}
          />
          <Card.Body>
            <Card.Title>{this.props.item.name}</Card.Title>
            <Card.Text> </Card.Text>
            <Button className="btn-sm float-left" variant="primary">
              Add To Cart
            </Button>
            <h3 className=" float-right" variant="primary">
              $ {this.props.item.price}
            </h3>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Product;
