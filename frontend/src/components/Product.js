import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";
import { Link } from "react-router-dom";

class Product extends Component {


  render() {
    return (
      <Col md={4} className="mt-4">
        <Card style={{ width: "18rem" }}>
          <Link to={"products/" + this.props.item._id}>
            <Card.Img
              variant="top"
              src={`http://localhost:5000/${this.props.item.productImage}`}
              alt={this.props.item.name}
            />
          </Link>
          <Card.Body>
            <Card.Title>{this.props.item.name}</Card.Title>
            <Card.Text> </Card.Text>
            <Button
              className="btn-sm float-left"
              variant="primary"
              onClick={() => this.props.addToCart(this.props.item)}
            >
              Add To Cart
            </Button>
            <h3 className=" float-right" variant="primary">
              $ {this.props.item.price}
            </h3>
            <button onClick={() => console.log(this.props.cart)}>cart</button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(actionTypes.addToCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
