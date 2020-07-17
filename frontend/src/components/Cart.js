import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button } from "react-bootstrap";

class Cart extends Component {
  render() {
    return (
      <>
        {this.props.cart.length < 1 ? (
          <h2 className=" mt-3 mb-2 text-center">Your cart is empty</h2>
        ) : (
          <div>
            <h2 className=" mt-3 mb-2 text-center">Your Cart</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: "left" }}>{item.name}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2">Total Price</td>
                  <td>{this.props.price}</td>
                </tr>
              </tbody>
            </Table>
            <Button className="btn-sm btn-success">Checkout </Button>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart.items,
    price: state.productReducer.cart.totalPrice,
  };
};
export default connect(mapStateToProps)(Cart);
