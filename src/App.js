import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import HomePage from "./pages/home";
import ProductDetailPage from "./pages/productDetail";
import ShoppingPage from "./pages/shoppingCart";
import ScrollToTop from "./components/ScrollToTop";
export default class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop />
        <Header />
        <Cart />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/product-detail/:productId"
            component={ProductDetailPage}
          />
          <Route path="/shopping-cart" component={ShoppingPage} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}
