import React, { Component } from "react";

export class ProductDetails extends Component {
  render() {
    return (
      <div>
        <h1>Product Details Page for {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default ProductDetails;
