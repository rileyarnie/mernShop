import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import * as actionTypes from "../store/actions/actionTypes";
import axios from "axios";

class Cart extends Component {
  state = {
    phoneNumber: "",
  };

  handlePhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  handleMpesa = () => {
    axios({
      method: "POST",
      url: "http://localhost:5000/mpesa/stk",
      data: {
        phoneNumber: `254${this.state.phoneNumber}`,
      },
    })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <th></th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: "left" }}>{item.name}</td>
                    <td>
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() => this.props.removeItem(item, index)}
                        src="https://img.icons8.com/small/16/000000/filled-trash.png"
                        alt="remove"
                      />
                    </td>
                    <td>{item.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3">Total Price</td>
                  <td>{this.props.price}</td>
                </tr>
              </tbody>
            </Table>
            <InputGroup
              className="mb-3"
              onChange={(event) => this.handlePhoneNumber(event)}
            >
              <InputGroup.Prepend>
                <InputGroup.Text>254</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="enter phone number.."
                aria-label="enter phone number.."
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <Button
              disabled={
                this.state.phoneNumber.trim().length < 9 ||
                this.state.phoneNumber.trim().length > 9
              }
              className="btn-sm btn-success"
              onClick={() => this.handleMpesa()}
            >
              LipaNaMpesa
            </Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (item, index) =>
      dispatch(actionTypes.removeFromCart(item, index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
