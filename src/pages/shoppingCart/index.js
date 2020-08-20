import React, { Component } from "react";
import ShoppingCart from "./components/ShoppingCart";
import Breadcrumb from "./components/Breadcrumb";

export default class ShoppingPage extends Component {
  render() {
    return (
      <>
        <Breadcrumb />
        <ShoppingCart />
      </>
    );
  }
}
