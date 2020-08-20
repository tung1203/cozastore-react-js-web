import CartContext from "./CartContext";
import React, { Component } from "react";

class CartProvider extends Component {
  constructor(props) {
    super(props);
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : { cart: [], total: 0 };
    this.state = cart;
  }
  // state = {
  //   cart: [
  //     {
  //       productId: "5c11e82ad3683ee5a6022c65",
  //       name: "t-shirt",
  //       size: "XL",
  //       color: "Blue",
  //       quantity: 2,
  //       image:
  //         "1593513148449-8dac2a15-0951-42aa-9593-c488fac5215b-5_ok_8f61043027234de992f8b84181df7789_grande.png",
  //       price: 1000000,
  //     },
  //     {
  //       productId: "5c11e82ad3683ee5a6022c66",
  //       name: "abc",
  //       size: "L",
  //       color: "Green",
  //       quantity: 2,
  //       image:
  //         "1593513148454-1dbd201f-9328-415f-87ed-2ce1137a765d-6_f9d1e8ba333044bb9381e3f0f942aa40_grande.png",
  //       price: 1000000,
  //     },
  //     {
  //       productId: "5c11e82ad3683ee5a6022c66",
  //       name: "abc",
  //       size: "L",
  //       color: "Red",
  //       quantity: 2,
  //       image:
  //         "1593513148454-1dbd201f-9328-415f-87ed-2ce1137a765d-6_f9d1e8ba333044bb9381e3f0f942aa40_grande.png",
  //       price: 1000000,
  //     },
  //     {
  //       productId: "5c11e82ad3683ee5a6022c66",
  //       name: "43",
  //       size: "L",
  //       color: "Green",
  //       quantity: 2,
  //       image:
  //         "1593513333538-54afb89b-a4a9-4a36-bf8d-c1cbf5daf16e-d_b5cf61f56ee545d5ac447bd4617d2019_grande.png",
  //       price: 1000000,
  //     },
  //   ],
  //   total: 4000000,
  // };

  addToCart = (newProduct) => {
    let flag = false;
    const newState = this.state.cart.map((product) => {
      if (
        product.size === newProduct.size &&
        product.color === newProduct.color &&
        product.name === newProduct.name
      ) {
        product.quantity =
          parseInt(product.quantity) + parseInt(newProduct.quantity);
        flag = true;
      }
      return product;
    });
    if (newState.length <= 0) {
      newState.push(newProduct);
    }
    const newTotal = newState.reduce((accumulator, currentProduct) => {
      let currentPrice = currentProduct["price"] * currentProduct["quantity"];
      return accumulator + currentPrice;
    }, 0);
    if (flag) {
      this.setState({ ...this.state, cart: newState, total: newTotal });
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...this.state, cart: newState, total: newTotal })
      );
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, newProduct],
        total: newTotal,
      });
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...this.state,
          cart: [...this.state.cart, newProduct],
          total: newTotal,
        })
      );
    }
  };
  removeFromCart = (removedProduct) => {
    const newState = this.state.cart.filter(
      (product) =>
        product.name !== removedProduct.name ||
        product.size !== removedProduct.size ||
        product.color !== removedProduct.color
    );
    const newTotal = newState.reduce((accumulator, currentProduct) => {
      let currentPrice = currentProduct["price"] * currentProduct["quantity"];
      return accumulator + currentPrice;
    }, 0);

    this.setState({ ...this.state, cart: newState, total: newTotal });
    localStorage.setItem(
      "cart",
      JSON.stringify({ ...this.state, cart: newState, total: newTotal })
    );
  };
  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
