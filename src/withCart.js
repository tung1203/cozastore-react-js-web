import React from "react";
import CartContext from "./CartContext";

const withCart = (WrappedComponent) => {
  const WithHOC = (props) => {
    return (
      <CartContext.Consumer>
        {(context) => <WrappedComponent {...props} context={context} />}
      </CartContext.Consumer>
    );
  };
  WithHOC.WrappedComponent = WrappedComponent;
  return WithHOC;
};
export default withCart;
