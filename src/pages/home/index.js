import React, { Component } from "react";
import Slider from "./components/Slider";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: null,
    };
  }
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "/js/slick-custom.js";
    script.async = true;

    document.body.appendChild(script);
  }
  setcurrentProductId(productId) {
    this.setState({ ...this.state, currentProductId: productId });
  }
  render() {
    return (
      <>
        <Slider />
        <Banner />
        <ProductList searchParams={this.props.location.search} />
      </>
    );
  }
}
