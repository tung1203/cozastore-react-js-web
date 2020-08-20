import React, { Component } from "react";
import Breadcrumb from "./components/Breadcrumb";
import ProductDetail from "./components/ProductDetail";
import Modal from "./components/Modal";

export default class ProductDetailPage extends Component {
  render() {
    return (
      <>
        <Breadcrumb />
        <ProductDetail productId={this.props.match.params.productId} />
        {/* <RelatedProduct /> */}
        <Modal />
      </>
    );
  }
}
