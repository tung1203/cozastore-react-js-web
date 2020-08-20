import React, { Component } from "react";
import { Link } from "react-router-dom";

import withCart from "../withCart";
import { toVnd } from "../utils/formatPrice";

class ProductCart extends Component {
  removeFromCart = () => {
    const cartItem = {
      size: this.props.size,
      color: this.props.color,
      name: this.props.name,
    };
    this.props.context.removeFromCart(cartItem);
  };
  render() {
    return (
      <li className="header-cart-item flex-w flex-t m-b-12">
        <div className="header-cart-item-img" onClick={this.removeFromCart}>
          <img
            src={`http://localhost:8080/images/${this.props.image}`}
            alt="IMG"
          />
        </div>
        <div className="header-cart-item-txt p-t-8">
          <Link
            to={`/product-detail/${this.props.productId}`}
            className="header-cart-item-name m-b-18 hov-cl1 trans-04"
          >
            {this.props.name}
          </Link>
          <span className="header-cart-item-info">
            {this.props.quantity} x {toVnd(this.props.price)}
          </span>
        </div>
      </li>
    );
  }
}
export default withCart(ProductCart);
