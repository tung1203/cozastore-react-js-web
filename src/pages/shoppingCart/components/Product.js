import React, { Component } from "react";
import { toVnd } from "../../../utils/formatPrice";
import withCart from "../../../withCart";

class Product extends Component {
  increseQuantity = () => {
    const cartItem = {
      size: this.props.size,
      color: this.props.color,
      name: this.props.name,
      quantity: 1,
    };
    this.props.context.addToCart(cartItem);
  };
  reduceQuantity = () => {
    const cartItem = {
      size: this.props.size,
      color: this.props.color,
      name: this.props.name,
      quantity: -1,
    };
    this.props.context.addToCart(cartItem);
  };
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
      <tr className="table_row">
        <td className="column-1">
          <div className="how-itemcart1" onClick={this.removeFromCart}>
            <img
              src={`http://localhost:8080/images/${this.props.image}`}
              alt="IMG"
            />
          </div>
        </td>
        <td className="column-2">{this.props.name}</td>
        <td className="column-1">{this.props.size}</td>
        <td className="column-1">{this.props.color}</td>
        <td className="column-3">{toVnd(this.props.price)}</td>
        <td className="column-4">
          <div className="wrap-num-product flex-w m-l-auto m-r-0">
            <div
              className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
              onClick={this.reduceQuantity}
            >
              <i className="fs-16 zmdi zmdi-minus" />
            </div>
            <input
              className="mtext-104 cl3 txt-center num-product"
              type="number"
              name="num-product1"
              defaultValue={this.props.quantity}
            />
            <div
              className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
              onClick={this.increseQuantity}
            >
              <i className="fs-16 zmdi zmdi-plus" />
            </div>
          </div>
        </td>
        <td className="column-5">
          {toVnd(this.props.price * this.props.quantity)}
        </td>
      </tr>
    );
  }
}
export default withCart(Product);
