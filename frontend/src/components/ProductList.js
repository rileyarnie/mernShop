import React, { Component } from "react";
import Product from "./Product";
import { Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";

class ProductList extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <Row>
        {this.props.products.length < 1 ? (
          <div className="mt-4 mr-auto ml-auto container">
            <Spinner animation="border" />{" "}
          </div>
        ) : (
          this.props.products.map((item) => (
            <Product key={item._id} item={item} />
          ))
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(actionTypes.gettingProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
